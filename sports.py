import requests
import sys
import json

# sports_url = ('https://newsapi.org/v2/top-headlines?''category=sports&''pageSize=100&''country=in&''apiKey=57c0fcb51bc74ebbb71643ef42293cdd')
sports_url = ('https://newsapi.org/v2/top-headlines?''category=sports&''pageSize=100&''country=in&''apiKey=91648223599b4dfa9821d94765d9a378')
sports_response = requests.get(sports_url)
sports_data = sports_response.json()

print(json.dumps(sports_data))
sys.stdout.flush()