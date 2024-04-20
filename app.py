from flask import Flask, jsonify, redirect, url_for
import requests

app = Flask(__name__)

@app.route('/')
def index():
    # Redirect to the '/github_repos' route
    return redirect(url_for('list_github_repos'))

@app.route('/github_repos')
def list_github_repos():
    token = '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'  # Replace with your personal access token
    headers = {'Authorization': f'token {token}'}
    repos = []
    last_repo_id = 0  # Start from the first repo

    for x in range(10):
        url = f'https://api.github.com/repositories?since={last_repo_id}'
        response = requests.get(url, headers=headers)
        data = response.json()
        if not data:
            break
        repos.extend(data)
        last_repo_id = data[-1]['id']  # Get the ID of the last repo in the current batch

    return jsonify(repos)

if __name__ == '__main__':
    app.run(debug=True)