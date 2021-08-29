import requests
import sys
import json

# general_url = ('https://newsapi.org/v2/top-headlines?''category=general&''pageSize=100&''country=in&''apiKey=57c0fcb51bc74ebbb71643ef42293cdd')
general_url = ('https://newsapi.org/v2/top-headlines?''category=general&''pageSize=100&''country=in&''apiKey=91648223599b4dfa9821d94765d9a378')
general_response = requests.get(general_url)
general_data = general_response.json()

print(json.dumps(general_data))
sys.stdout.flush()