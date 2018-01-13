import React from 'react';
import { Link } from 'react-router';

class Following extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    fetch(
      `https://api.github.com/users/${this.props.params.username}/following`
    )
      .then(response => response.json())
      .then(following => {
        this.setState({
          following: following
        });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.params.username !== this.props.params.username) {
      fetch(
        `https://api.github.com/users/${this.props.params.username}/following`
      )
        .then(response => response.json())
        .then(following => {
          this.setState({
            following: following
          });
        });
    }
  }
  GithubUser(user) {
    return (
      <Link to={`/user/${user.login}`}>
        <img src={user.avatar_url} alt={`${user.login} avatar`} />
      </Link>
    );
  }

  render() {
    if (!this.state.following) {
      return <div>LOADING FOLLOWING...</div>;
    }
    return (
      <div className="following-page">
        <h3>Followed by {this.props.params.username}</h3>
        <ul>{this.state.following.map(this.GithubUser)}</ul>
      </div>
    );
  }
}

export default Following;