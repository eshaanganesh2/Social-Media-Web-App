import requests
import sys
import json

# health_url = ('https://newsapi.org/v2/top-headlines?''category=health&''pageSize=100&''country=in&''apiKey=57c0fcb51bc74ebbb71643ef42293cdd')
health_url = ('https://newsapi.org/v2/top-headlines?''category=health&''pageSize=100&''country=in&''apiKey=91648223599b4dfa9821d94765d9a378')
health_response = requests.get(health_url)
health_data = health_response.json()

print(json.dumps(health_data))
sys.stdout.flush()