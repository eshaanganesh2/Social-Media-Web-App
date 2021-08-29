import requests
import sys
import json

# technology_url = ('https://newsapi.org/v2/top-headlines?''category=technology&''pageSize=100&''country=in&''apiKey=57c0fcb51bc74ebbb71643ef42293cdd')
technology_url = ('https://newsapi.org/v2/top-headlines?''category=technology&''pageSize=100&''country=in&''apiKey=91648223599b4dfa9821d94765d9a378')
technology_response = requests.get(technology_url)
technology_data = technology_response.json()

print(json.dumps(technology_data))
sys.stdout.flush()