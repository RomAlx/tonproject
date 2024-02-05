import requests
import json

url = "https://api.nowpayments.io/v1/sub-partner/balance"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1NzUxOTE3OTUiLCJpYXQiOjE3MDcxNTE0MzMsImV4cCI6MTcwNzE1MTczM30.6pzLiJNQ3zkpMo7M4HkzBMzIFiDBZQQK_ssd8Ub0zHo"

payload = json.dumps(
    {
        "name": "test2"
    }
)
headers = {
    "Authorization": f'Bearer {token}',
    "Content-Type": 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(json.dumps(response.json(), indent=4, ensure_ascii=False, sort_keys=True))
