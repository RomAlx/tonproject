import requests
import json

url = "https://api.nowpayments.io/v1/sub-partner/balance/1682568464"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1NzUxOTE3OTUiLCJpYXQiOjE3MDcxNTQyNjAsImV4cCI6MTcwNzE1NDU2MH0.Gnk7aei1jtVPelZFA9IL3dyBHZxJL2r5Ar5OylzRrXk"

payload = {}
headers = {
    "Authorization": f'Bearer {token}',
    "Content-Type": 'application/json',
    "x-api-key": '1S4MWHA-CW8MM3V-NQNSQAW-WW3DGGP'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(json.dumps(response.json(), indent=4, ensure_ascii=False, sort_keys=True))
