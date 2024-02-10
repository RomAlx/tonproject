import requests
import json

url = "https://api.nowpayments.io/v1/sub-partner"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1NzUxOTE3OTUiLCJpYXQiOjE3MDc0MjkwNDEsImV4cCI6MTcwNzQyOTM0MX0.n6BY7k9mz0_bHSH2AKerMfcBoT37_b6evGkhdRyvJtU"

payload = {}
headers = {
    "Authorization": f'Bearer {token}',
    "Content-Type": 'application/json'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(json.dumps(response.json(), indent=4, ensure_ascii=False, sort_keys=True))
