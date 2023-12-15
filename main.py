from flask import Flask, make_response, request, render_template, send_from_directory, jsonify, Response
from controller import services as function
import requests as rq
import json
import os

app = Flask(__name__, static_url_path='/static')

global categories

@app.route('/')
def main():
   return "Online"

@app.route('/homepage')
def homepage():
    return render_template('index.html')

@app.route('/articles')
def getArticles():
  articles = []
  selectedCategory = request.args.get('category')
  fenixToken = function.GetFenixToken()
  url = "https://faq.directtalk.com.br/1.0/api/article/department/summary?id=1f0cf10b-f3e4-462e-88fe-61a461385d4b&filterActiveArticles=true&skip=0&count=9999&orderBy=1"
  payload = {}
  headers = {
  'Authorization': 'DT-Fenix-Token ' + fenixToken['token']
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
  articles = json.dumps(articles)
  return articles

@app.route('/categories')
def getCategories():
   categories = []
   url = "https://faq.directtalk.com.br/1.0/api/category/department/?id=1f0cf10b-f3e4-462e-88fe-61a461385d4b"
   payload = {}
   headers = {
  'authority': 'faq.directtalk.com.br',
  'accept': 'application/json, text/plain, */*'
  }
   response = rq.request("GET", url, headers=headers, data=payload)
   response = response.json()
   for i in range(len(response)):
      category = {
         "id": response[i]['id'],
         "name": response[i]['text']
      }
      categories.append(category)
   categories = json.dumps(categories)
   return categories

@app.route("/newarticle", methods=['POST'])
def newArticle():
   fenixToken = function.GetFenixToken()
   article = request.get_json()
   url = "https://www3.directtalk.com.br/adminuiservices/api/Proxy"
   payload = json.dumps({
  "serviceName": "dtfaq",
  "qualifier": "1.0",
  "path": "article",
  "data": [
    {
      "IsVisibleOnTop": True,
      "Resposta": article['message'],
      "Tags": [],
      "categories": [
        {
          "departamentId": "1f0cf10b-f3e4-462e-88fe-61a461385d4b",
          "knowledgeBaseId": "768dd089-7fcf-4fe0-bd50-9ffa400d6220",
          "text": article['categoryName'],
          "activeIcon": None,
          "inactiveIcon": None,
          "iconType": "image",
          "order": 2,
          "display": True,
          "id": article['categoryId'],
          "active": True
        }
      ],
      "Topics": [],
      "Pergunta": article['title'],
      "integrations": [],
      "UUidArtigo": "00000000-0000-0000-0000-000000000000",
      "UUidDepartamento": "1f0cf10b-f3e4-462e-88fe-61a461385d4b",
      "UUidSite": "fe0f60c2-26e6-4bd6-848e-ce25271a8a5b",
      "active": True
    }
  ],
  "method": "POST"
})
   headers = {
  'Authorization': 'DT-Fenix-Token ' + fenixToken['token'],
  'Content-Type': 'application/json'
}
   response = rq.request("POST", url, headers=headers, data=payload)
   if response.status_code == 200:
      return "Artigo criado.", 200
   else:
      return "Erro ao criar artigo.", response.status_code
   
@app.route('/tenants')
def tenantsFilter():
  tenantsIndex = request.args.get('filter')
  url = "https://tenant.directtalk.com.br/1.0/tenants?filter=" + tenantsIndex
  payload = {}
  headers = {
    'authorization': 'Basic ZHRzMXdpbGxpYW0ud2VpZGdlbmFuZDozNDY2MTE3V3c='
  }
  response = rq.request("GET", url, headers=headers, data=payload)
  data = json.loads(response.content)
  if response.status_code == 200:
    return Response(json.dumps({
      'Status': 'OK',
      'Data': data
    }),
                    status=200,
                    content_type='application/json')
  else:
    return Response(json.dumps(
      {'Status': 'Erro na requisição de busca de dados'}),
                    status=response.status_code,
                    content_type='application/json')
   
if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8080, debug=True)