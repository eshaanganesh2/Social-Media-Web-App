import requests
import sys
import json

url = ('https://newsapi.org/v2/top-headlines?''country=in&''apiKey=57c0fcb51bc74ebbb71643ef42293cdd')
response = requests.get(url)
data = response.json()


print(json.dumps(data))
sys.stdout.flush()