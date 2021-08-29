import requests
import sys
import json

# business_url = ('https://newsapi.org/v2/top-headlines?''category=business&''pageSize=100&''country=in&''apiKey=57c0fcb51bc74ebbb71643ef42293cdd')
business_url = ('https://newsapi.org/v2/top-headlines?''category=business&''pageSize=100&''country=in&''apiKey=91648223599b4dfa9821d94765d9a378')
business_response = requests.get(business_url)
business_data = business_response.json()

print(json.dumps(business_data))
sys.stdout.flush()