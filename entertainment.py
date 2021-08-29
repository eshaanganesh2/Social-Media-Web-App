import requests
import sys
import json

# entertainment_url = ('https://newsapi.org/v2/top-headlines?''category=entertainment&''pageSize=100&''country=in&''apiKey=57c0fcb51bc74ebbb71643ef42293cdd')
entertainment_url = ('https://newsapi.org/v2/top-headlines?''category=entertainment&''pageSize=100&''country=in&''apiKey=91648223599b4dfa9821d94765d9a378')
entertainment_response = requests.get(entertainment_url)
entertainment_data = entertainment_response.json()

print(json.dumps(entertainment_data))
sys.stdout.flush()