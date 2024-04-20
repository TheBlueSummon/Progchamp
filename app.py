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
    repos_data = []

    # Fetch repositories
    last_repo_id = 0  # Start from the first repo
    for x in range(10):
        url = f'https://api.github.com/repositories?since={last_repo_id}'
        response = requests.get(url, headers=headers)
        data = response.json()
        if not data:
            break
        for repo in data:
            repo_info = {
                'name': repo['name'],
                'description': get_repo_description(repo['url'], headers),
                'languages': get_repo_languages(repo['languages_url'], headers)
            }
            repos_data.append(repo_info)
        last_repo_id = data[-1]['id']  # Get the ID of the last repo in the current batch

    return jsonify(repos_data)


def get_repo_description(repo_url, headers):
    # Fetch repository details to get the README
    response = requests.get(repo_url, headers=headers)
    repo_details = response.json()
    # Extract README contents
    readme_url = repo_details['contents_url'].replace('{+path}', 'README.md')
    response = requests.get(readme_url, headers=headers)
    readme_contents = response.json()
    # Return README contents
    return readme_contents.get('content', '')


def get_repo_languages(languages_url, headers):
    # Fetch repository languages
    response = requests.get(languages_url, headers=headers)
    languages_data = response.json()
    return languages_data


if __name__ == '__main__':
    app.run(debug=True)