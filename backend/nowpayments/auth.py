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

print(json.dumps(response.json(), indent=4, ensure_ascii=False, sort_keys=True))