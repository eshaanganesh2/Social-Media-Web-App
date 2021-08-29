import requests
import sys
import json

# science_url = ('https://newsapi.org/v2/top-headlines?''category=science&''pageSize=100&''country=in&''apiKey=57c0fcb51bc74ebbb71643ef42293cdd')
science_url = ('https://newsapi.org/v2/top-headlines?''category=science&''pageSize=100&''country=in&''apiKey=91648223599b4dfa9821d94765d9a378')
science_response = requests.get(science_url)
science_data = science_response.json()

print(json.dumps(science_data))
sys.stdout.flush()