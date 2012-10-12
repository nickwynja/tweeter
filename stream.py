import tweetstream
import sys
import json

words =  ["beiber"]
stream = tweetstream.FilterStream("loverly", "oliver11", track=words)

for t in stream:
  tweet = json.dumps({"screen_name": t['user']['screen_name'], "created_at": t['created_at'], "id": t['id'], "text": t['text']})
  f = open('/Users/nickwynja/Sites/tweeter/tweets.txt', 'a')
  f.write("," + tweet)
  f.closed