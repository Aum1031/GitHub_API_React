import React from 'react';


class Repos extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.props.params.username}/repos`)
      .then(response => response.json())
      .then(repos => {
        this.setState({
          repos: repos
        });
      });
  }

  GithubRepos(repo) {
    return (
      <div className="card">
        <div href={`/repo/${repo.url}`}>
          <li>Name: {repo.name}</li>
          <li>Description: {repo.description}</li>
          <li>Git Url: {repo.git_url}</li>
          <li>Stars: {repo.watchers_count}</li>
          <li>Fork Count: {repo.forks_count}</li>
          <li>Number of Issues: {repo.has_issues}</li>
          <li>Repo Size: {repo.size}</li>
        </div>
      </div>
    );
  }
  render() {
    if (!this.state.repos) {
      return <div>LOADING REPOS...</div>;
    }
    return (
      <div className="repos-page">
        <h3>Repos of {this.props.params.username}</h3>
        <ul>{this.state.repos.map(this.GithubRepos)}</ul>
      </div>
    );
  }
}


export default Repos;