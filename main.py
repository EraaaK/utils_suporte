from flask import Flask, make_response, request, render_template, redirect, url_for, flash, jsonify, send_file, Response

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def main():
   return "Online"

@app.route('/homepage')
def homepage():
    return render_template('index.html')

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8080, debug=True)