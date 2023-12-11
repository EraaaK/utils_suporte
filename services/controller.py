import requests

def GetFenixToken():
    url = "https://www3.directtalk.com.br/adminuiservices/api/Login"
    payload = "{}"
    headers = {
    'Accept': 'application/json, text/plain, */*',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Basic Y2MyMXZhbGlkYWRvcjp3aWxsaWFtMTE3'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    response = response.json()
    return response
