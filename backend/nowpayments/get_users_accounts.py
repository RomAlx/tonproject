import requests
import json

url = "https://api.nowpayments.io/v1/sub-partner"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1NzUxOTE3OTUiLCJpYXQiOjE3MDcxNTg5OTksImV4cCI6MTcwNzE1OTI5OX0.bEMCXKir731-gypwWbLBn4RYRv-9uRhoG-gkyk8NmL8"

payload = {}
headers = {
    "Authorization": f'Bearer {token}',
    "Content-Type": 'application/json'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(json.dumps(response.json(), indent=4, ensure_ascii=False, sort_keys=True))
