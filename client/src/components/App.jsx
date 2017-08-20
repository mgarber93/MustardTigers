import React from 'react';
import axios from 'axios';
import MainRouter from './MainRouter.jsx';
import Header from './Header.jsx';
import { Route, Redirect } from 'react-router';

/**
 * Class representing the App.
 * @extends App
 * @todo abstract fetch methods
 */
 
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        userId: undefined,
        username: undefined,
        clans: [],
        posts: [],
      },
      clans: []
    };

    this.fetchUsersMemberships = this.fetchUsersMemberships.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.registerNewClan = this.registerNewClan.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.setDefaultState = this.setDefaultState.bind(this);
    this.fetchUsersClans = this.fetchUsersClans.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchUsersClans();
    // TODO: Get all Messages
  }
  
  setDefaultState(message) {
    this.setState(
      {
        user: {
          userId: undefined,
          username: undefined,
          clans: [],
          posts: [],
        }, 
        clans: []
      }, () => {
        console.log(message);
      }
    );
  }

  fetchUser() {
    return axios.get('/api/auth/session')
      .then(({data}) => {
        if (data.results) {
          this.setState({
            user: Object.assign(this.state.user, {
              userId: data.results.id,
              username: data.results.username
            })
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  fetchUsersMemberships(userId) {
    return axios.get(`/api/users/${userId}/members/`)
      .then(({data}) => {
        var newUser = this.state.user;
        newUser.clans = data.results;
        this.setState(
          {
            user: newUser
          }, () => {
            console.log(
              `${this.state.user.clans.length ? ('You are a member of ' + 
              this.state.user.clans.map(c => c.name).join(', ')) : 
                'you haven\'t joined any clans yet!'}`);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * Fetch the clans created by a given user.
   *  
   * @param {object} query 
   */
  fetchUsersClans(query = {creatorId: this.state.user.userId}) {
    return axios.get('/api/clans/', {query})
      .then(({data}) => {
        if (data.results) {
          this.setState({
            user: Object.assign(this.state.user, {
              clans: data.results
            })
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  registerUser(user) {
    console.log('(Client) Registering New User');
    return axios.post('/api/users', user)
      .then(result => {
        var newUser = this.state.user;
        newUser.userId = result.data.id;
        newUser.username = user.username;
        this.setState(
          {
            user: newUser
          },
          () => {
            console.log('You are logged in!', this.state.user.username, this.state.user.userId);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  registerNewClan(clan) {
    if (!this.state.user.userId) {
      throw new Error('You must be signed in to create a clan!');
    }
    console.log('user.id', this.state.user.userId);
    clan.creatorId = this.state.user.userId;
    return axios.post('/api/clans/', clan)
      .then(({data}) => {
        // console.log('(Client) Success! Registered New clan', data);
        var newUser = this.state.user;
        newUser.clans = this.state.user.clans.concat(data);
        this.setState({user: newUser}, () => {
          // console.log('Registered New Clan', this.state.user.clans);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * Attempt to login a user object. On success, fetch user's clans and friends.
   * 
   * @param {Object} user Has a `username` and `password` property
   * @todo Redirect on success or inform user on failure
   */
  loginUser(user) {
    return axios.post('/api/auth/local', user)
      .then(result => {
        this.setState(
          {
            user: {
              userId: result.data.id,
              username: user.username,
            }
          },
          () => {
            console.log('You are logged in!', this.state.user.username, this.state.user.userId);
            this.fetchUsersClans();
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  /**
   * Logout by clearing all state back to default conditions.
   */
  logoutUser(user) {
    console.log('Logging out...');
    axios.post('/api/auth/logout')
      .then((user) => {
        let message = 'Goodbye, ' + this.state.user.userId + ' has been logged out.';
        this.setDefaultState(message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Header 
          username={this.state.user.username}
          clans={this.state.user.clans || []}
        />
        <MainRouter
          user={this.state.user}
          registerUser={this.registerUser}
          loginUser={this.loginUser}
          logoutUser={this.logoutUser}
          addNewClan={this.registerNewClan}
          fetchUsersClans={this.fetchUsersClans}
        />
      </div>
    );
  }
}

export default App;