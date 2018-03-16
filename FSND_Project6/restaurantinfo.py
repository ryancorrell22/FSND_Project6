import requests
import json
ACCESS_TOKEN = 'Mb1xhhEnY7B1ByLwt1eGM_j0zLTtzINU9p8oV9ca2Y0MHZn_jsaSezEbnr8rCxBRC6a0PudtM-NIU7Gk8KUNOsAAAdGr-W2mWKRYRPpBN9bK-pr9A3usNbLkElBpWXYx'
headers = {'content-type': 'application/json', 'Authorization': 'Bearer ' + ACCESS_TOKEN}
alfredsinfo = []
hardrockinfo = []
aldosinfo = []
bluemonkeyinfo = []
bbkinginfo = []
locations = [('alfreds-on-beale-memphis'), ('hard-rock-cafe-memphis-6'), ('aldos-pizza-pies-memphis-2'), ('the-blue-monkey-memphis-2'), ('bb-kings-blues-club-memphis')]
for i in locations:
	url = 'https://api.yelp.com/v3/businesses/%s' %i
	response = requests.get(url, headers=headers)
	print(response)
	response_data = response.json()
	print (response_data['rating'])

