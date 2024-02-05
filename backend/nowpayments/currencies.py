import requests
import json

url = "https://api.nowpayments.io/v1/currencies?fixed_rate=true"

payload={}
headers = {
  'x-api-key': '1S4MWHA-CW8MM3V-NQNSQAW-WW3DGGP'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(json.dumps(response.json(), indent=4, ensure_ascii=False, sort_keys=True))