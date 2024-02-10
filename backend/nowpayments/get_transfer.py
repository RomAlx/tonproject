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
    'x-api-key': '1S4MWHA-CW8MM3V-NQNSQAW-WW3DGGP',
    'Content-Type': 'application/json'
}
response = requests.request("GET",
                            url=url + 'sub-partner/transfer/' + str(1177622345),
                            headers=headers,
                            params=payload
                            )
print(json.dumps(response.json(), indent=4, ensure_ascii=False, sort_keys=True))