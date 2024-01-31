import os
import json
from dotenv import load_dotenv
import asyncio
import httpx
import websockets

from typing import List, Callable, Any, Awaitable, Tuple, Optional, Dict, AsyncGenerator
from backend.objects.ton_client.schema.events import TransactionEventData, TraceEventData

from backend.objects.ton_client.exceptions.exceptions import (
    TONAPIBadRequestError,
    TONAPIError,
    TONAPIInternalServerError,
    TONAPINotFoundError,
    TONAPIUnauthorizedError,
    TONAPITooManyRequestsError,
    TONAPINotImplementedError
)

class Client():
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv("TON_API_KEY")
        self.is_testnet = os.getenv("IS_TESTNET")
        self.timeout = None
        self.base_url = "https://tonapi.io/" if not self.is_testnet else "https://testnet.tonapi.io/"
        self.websocket_url = "wss://tonapi.io/v2/websocket"
        self.headers = {"Authorization": f"Bearer {self.api_key}"}

    @staticmethod
    async def __read_content(response: httpx.Response) -> Any:
        """
        Read the response content.

        :param response: The HTTP response object.
        :return: The response content.
        """
        try:
            content = response.json()
        except httpx.ResponseNotRead:
            content_bytes = await response.aread()
            content_decoded = content_bytes.decode()
            try:
                content = json.loads(content_decoded)
            except json.JSONDecodeError:
                content = {"error": content_decoded}
        except json.JSONDecodeError:
            content = {"error", response.text}
        except Exception as e:
            raise TONAPIError(f"Failed to read response content: {e}")

        return content

    async def __process_response(self, response: httpx.Response) -> Dict[str, Any]:
        """
        Process the HTTP response and handle errors.

        :param response: The HTTP response object.
        :return: The response content as a dictionary.
        :raises TONAPIError: If there is an error status code in the response.
        """
        content = await self.__read_content(response)

        if response.status_code != 200:
            error_map = {
                400: TONAPIBadRequestError,
                401: TONAPIUnauthorizedError,
                403: TONAPIInternalServerError,
                404: TONAPINotFoundError,
                429: TONAPITooManyRequestsError,
                500: TONAPIInternalServerError,
                501: TONAPINotImplementedError,
            }
            error_class = error_map.get(response.status_code, TONAPIError)
            error = content.get("error", content)
            raise error_class(error)

        return content

    async def _subscribe(
            self,
            method: str,
            params: Optional[Dict[str, Any]],
    ) -> AsyncGenerator[str, None]:
        """
        Subscribe to an SSE event stream.

        :param method: The API method to subscribe to.
        :param params: Optional parameters for the API method.
        """
        url = self.base_url + method
        timeout = httpx.Timeout(timeout=self.timeout)
        data = {"headers": self.headers, "params": params, "timeout": timeout}

        async with httpx.AsyncClient() as client:
            try:
                async with client.stream("GET", url=url, **data) as response:
                    response: httpx.Response
                    if response.status_code != 200:
                        await self.__process_response(response)
                    async for line in response.aiter_lines():
                        try:
                            key, value = line.split(": ", 1)
                        except ValueError:
                            continue
                        if value == "heartbeat":
                            continue
                        if key == "data":
                            yield value
            except httpx.LocalProtocolError:
                raise TONAPIUnauthorizedError

    async def subscribe_websocket_transactions(
            self,
            accounts: List[str],
            handler: Callable[[TraceEventData, ...], Awaitable[Any]],
            args: Tuple[Any, ...] = (),
    ) -> None:

        method = "v2/sse/accounts/transactions"
        params = {'accounts': accounts}
        async for data in self._subscribe(method=method, params=params):
            event = TransactionEventData(**json.loads(data))
            await handler(event, *args)