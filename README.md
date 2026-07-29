# Spam-Classifier
A machine learning–based spam message classifier using TF-IDF and Multinomial Naive Bayes, deployed with Flask for real-time web predictions.
# Spam Classifier

A simple Spam Message Classifier built using Machine Learning and Flask. The model predicts whether a given message is **Spam** or **Not Spam**.

## Features

- Text preprocessing
- TF-IDF Vectorization
- Multinomial Naive Bayes Classifier
- Flask REST API
- Simple web integration

## Tech Stack

- Python
- Flask
- Scikit-learn
- Pandas
- NumPy
- NLTK

## Project Structure

```
.
├── app.py
├── model1.pkl
├── vectorizer1.pkl
├── requirements.txt
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Spam-Classifier.git
cd Spam-Classifier
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the application

```bash
python app.py
```

The server will start at:

```
http://127.0.0.1:5000
```

## API Endpoint

### POST `/predict`

Request

```json
{
    "text": "Congratulations! You have won a prize."
}
```

Response

```json
{
    "prediction": 1
}
```

- `1` → Spam
- `0` → Not Spam

## Machine Learning Pipeline

- Text Cleaning
- Stopword Removal
- Porter Stemming
- TF-IDF Vectorization
- Multinomial Naive Bayes Classification

## Future Improvements

- Improve model accuracy
- Add more datasets
- Deploy on Render/Heroku
- Build a better frontend

## License

This project is for educational purposes.
