import json
from math import ceil
import pickle
from sklearn.feature_extraction.text import CountVectorizer
import sys
import numpy as np
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from tokenize import Double
import sys
from numpy import double
from textblob import TextBlob

# query = str(sys.argv[1])
query = json.loads(sys.argv[1])
reviews = eval(str(query))
score = 0

vectorizer = CountVectorizer()
pickled_model = pickle.load(open('model.pkl', 'rb'))
vectorizer = pickle.load(open("vectorizer.pickle",'rb'))
output = np.array(pickled_model.predict(vectorizer.transform(reviews)))

# print((output))


sentiments = {
    "positive": int,
    "negative": int,
    "neutral": int,
    "score": 0, #double
    "lenght": int,
    "output": [],
    "reviews": []
}

nltk.download('vader_lexicon')


positive = 0
negative = 0
neutral = 0
polarity = 0
review = []
pos_list = []
neg_list = []
neu_list = []

for rev in reviews:
    review.append(rev)
    analysis = TextBlob(rev)
    score = SentimentIntensityAnalyzer().polarity_scores(rev)
    neg = score["neg"]
    pos = score["pos"]
    neu = score["neu"]
    comp = score["compound"]
    polarity += analysis.sentiment.polarity
    if (neg > pos):
        neg_list.append(rev)
        negative += 1
    elif (pos > neg):
        pos_list.append(rev)
        positive += 1
    else:
        neu_list.append(rev)
        neutral += 1

sentiments["negative"] = negative
sentiments["positive"] = positive
# sentiments["score"] = ceil(polarity*5)/len(reviews)
for i in range(len(output)):
    if output[i] == 1:
        sentiments["score"] += 1
sentiments["neutral"] = neutral
sentiments["lenght"] = len(reviews)
sentiments["reviews"] = reviews
sentiments["output"] = output.tolist()

print(json.dumps(sentiments))