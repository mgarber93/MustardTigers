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
    };

    this.fetchUsersMemberships = this.fetchUsersMemberships.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.registerNewClan = this.registerNewClan.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.setDefaultState = this.setDefaultState.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
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
        }
      }, () => {
        console.log(message);
      }
    );
  }

  fetchUser() {
    axios.get('/api/auth/session')
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
    axios.get(`/api/users/${userId}/members/`)
      .then(data => {
        this.setState(
          {
            user: {
              userId: this.state.user.userId, 
              username: this.state.user.username, 
              clans: data
            }
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

  registerUser(user) {
    console.log('(Client) Registering New User');
    axios.post('/api/users', user)
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
            this.fetchUsersMemberships(this.state.user.userId);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  registerNewClan(clan) {
    console.log('Registering New Clan', clan);
    if (!this.state.user.userId) {
      throw new Error('You must be signed in to create a clan!');
    }
    clan.userId = this.state.user.userId;
    axios.post('/api/clans/', clan)
      .then(data => {
        console.log('(Client) Success! Registered New clan');
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * Receive and post a user object to the server
   * @param {Object} user Has a `username` and `password` property
   * @todo Redirect on success or inform user on failure
   */
  loginUser(user) {
    axios.post('/api/auth/local', user)
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
            this.fetchUsersMemberships(this.state.user.userId);
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
        <Header username={this.state.user.username}/>
        <MainRouter
          user={this.state.user}
          registerUser={this.registerUser}
          loginUser={this.loginUser}
          logoutUser={this.logoutUser}
          addNewClan={this.registerNewClan}
        />
      </div>
    );
  }
}

export default App;