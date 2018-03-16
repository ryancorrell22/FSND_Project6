import requests
import json
headers = {'content-type': 'application/json'}
url = 'https://api.yelp.com/oauth2/token'
params = {"grant_type": "client_credentials", "client_id": "HJVYwHfY0LV2rzzyRF5YSA", "client_secret": "IGPMX8k5vZAmWLTMRn0efiNWiStg8YIKuaP7KwswFq3CQ8jRM87oxqSxHcOvTF0K"}
response = requests.post(url, params=params, headers=headers)
print(response)
print(json.loads(response.text))
