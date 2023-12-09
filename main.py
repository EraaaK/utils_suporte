from flask import Flask, make_response, request, render_template, redirect, url_for, flash, jsonify, send_file, Response
import requests as rq

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def main():
   return "Online"

@app.route('/homepage')
def homepage():
    return render_template('index.html')

@app.route('/getarticles')
def getArticles():
  articles = []
  selectedCategory = request.args.get('category')
  url = "https://faq.directtalk.com.br/1.0/api/article/department/summary?id=1f0cf10b-f3e4-462e-88fe-61a461385d4b&filterActiveArticles=true&skip=0&count=10&orderBy=1"
  payload = {}
  headers = {
  'Authorization': 'DT-Fenix-Token P01_swsznwAJNFUzK2bqhsvt6ZRAciXRpEw1_43926_904'
}
  response = rq.request("GET", url, headers=headers, data=payload)
  response = response.json()
  for i in range(len(response['items'])):
     if response['items'][i]['categories'][0]['text'] == selectedCategory:
      article = {
        "category": response['items'][i]['categories'][0]['text'],
        "title": response['items'][i]['question'],
        "content": response['items'][i]['answer']
     }
      articles.append(article)
  return articles


if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8080, debug=True)