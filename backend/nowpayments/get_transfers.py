import requests
import json

url = "https://api.nowpayments.io/v1/auth"

payload = json.dumps({
  "email": "ton.project@yandex.ru",
  "password": "TonProject1488"
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

url = "https://api.nowpayments.io/v1/"
token = response.json()['token']

payload = {}
headers = {
    "Authorization": f'Bearer {token}',
}
response = requests.request("GET",
                            url=url + 'sub-partner/transfers',
                            headers=headers,
                            params=payload
                            )
transfers = response.json()['result']
for transfer in transfers:
    if transfer['id'] == "1177622345":
        print(json.dumps(transfer, indent=4, ensure_ascii=False, sort_keys=True))
