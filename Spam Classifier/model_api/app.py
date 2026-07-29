from flask import Flask, request, jsonify
import pickle
import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

# --- setup ---
app = Flask(__name__)

# download once (safe if already installed)
nltk.download('stopwords')

ps = PorterStemmer()

# --- preprocessing function ---
def transform_text(text):
    text = text.lower()

    # remove special characters
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)

    words = text.split()

    # remove stopwords
    words = [word for word in words if word not in stopwords.words('english')]

    # stemming
    words = [ps.stem(word) for word in words]

    return " ".join(words)


# --- load model + vectorizer ---
model = pickle.load(open("model1.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer1.pkl", "rb"))


# --- routes ---
@app.route("/")
def home():
    return "Spam Classifier API is running 🚀"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data or "text" not in data:
            return jsonify({"error": "No text provided"}), 400

        text = data["text"]

        # apply same preprocessing
        transformed_text = transform_text(text)

        # vectorize
        vector = vectorizer.transform([transformed_text])

        # predict
        prediction = model.predict(vector)[0]

        return jsonify({
            "prediction": int(prediction)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


# --- run server ---
if __name__ == "__main__":
    app.run(port=5000, debug=True)