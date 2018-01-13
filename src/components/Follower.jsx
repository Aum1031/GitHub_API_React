import React from 'react';
import { Link } from 'react-router';

class Followers extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    fetch(
      `https://api.github.com/users/${this.props.params.username}/followers`
    )
      .then(response => response.json())
      .then(followers => {
        this.setState({
          followers: followers
        });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.params.username !== this.props.params.username) {
      fetch(
        `https://api.github.com/users/${this.props.params.username}/followers`
      )
        .then(response => response.json())
        .then(followers => {
          this.setState({
            followers: followers
          });
        });
    }
  }

  Users(user) {
    return (
      <Link to={`/user/${user.login}`}>
        <img src={user.avatar_url} alt={`${user.login} avatar`} />
      </Link>
    );
  }
  render() {
    if (!this.state.followers) {
      return <div>LOADING FOLLOWERS...</div>;
    }
    return (
      <div className="followers-page" key={this.state.followers.id}>
        <h3>Followers of {this.props.params.username}</h3>
        <ul id="follower-images">{this.state.followers.map(this.Users)}</ul>
      </div>
    );
  }
}

export default Followers;