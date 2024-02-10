import requests
import json

url = "https://api.nowpayments.io/v1/sub-partner/balance/1682568464"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1NzUxOTE3OTUiLCJpYXQiOjE3MDc1MjEwMDcsImV4cCI6MTcwNzUyMTMwN30.p6bNf8E__aGif3RsPOl9xBk09ZOZXsHbu6Jg2lxu4fM"

payload = {}
headers = {
    "Authorization": f'Bearer {token}',
    "Content-Type": 'application/json',
    "x-api-key": '1S4MWHA-CW8MM3V-NQNSQAW-WW3DGGP'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(json.dumps(response.json(), indent=4, ensure_ascii=False, sort_keys=True))
