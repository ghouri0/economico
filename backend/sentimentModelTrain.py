import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
import pickle
df = pd.read_csv("Backend\Authentication-Site\\amazon_cells_labelled.txt",
                 names=['review', 'sentiment'], sep='\t')

reviews = df['review'].values
labels = df['sentiment'].values

reviews_train, reviews_test, y_train, y_test = train_test_split(
    reviews, labels, test_size=0.2, random_state=1000)

# print(df) 
 

vectorizer = CountVectorizer() 

vectorizer.fit(reviews_train)

X_train = vectorizer.transform(reviews_train)
X_test = vectorizer.transform(reviews_test)
classifier = LogisticRegression()
classifier.fit(X_train, y_train)
 

vec_file = 'vectorizer.pickle'
pickle.dump(vectorizer, open(vec_file, 'wb'))

accuracy = classifier.score(X_test, y_test)
print("Accuracy: ", accuracy*100, "%")

pickle.dump(classifier, open('model.pkl', 'wb'))

# new_reviews = ['Old version of python useless',
#                'Very good effort, but not five stars', 'Clear and concise']

# X_new = vectorizer.transform(new_reviews)
# results = classifier.predict(X_new)

# print(X_new)
# sentiments = []
# for i in results:
#     if (i == 1):
#         sentiments.append("positive")
#     else:
#         sentiments.append("negative")

# print(sentiments)

    