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
    this.registerNewUser = this.registerNewUser.bind(this);
    this.registerNewClan = this.registerNewClan.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
    // TODO: Get all Messages
  }

  /**
   * Logout by clearing all state back to default conditions.
   */
  logout() {
    this.setState(
      {
        user: {
          userId: undefined,
          username: undefined,
          clans: [],
          posts: [],
        }
      }, () => {
        console.log('You are logged out!');
      }
    );
  }

  fetchUsers() {
    axios.get('/users/')
      .then(data => {
        this.setState({users: data});
      })
      .catch(err => {
        console.error(err);
      });
  }

  fetchUsersMemberships(userId) {
    axios.get(`/users/${userId}/members/`)
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

  registerNewUser(user) {
    console.log('(Client) Registering New User');
    axios.post('/auth/local', user)
      .then(data => {
        console.log('(Client) Success! Registering New User');
        //Set State here or at registration success?
      })
      .catch(err => {
        console.log('(Client) Success! Registering New User');
      });
  }

  registerNewClan(clan) {
    console.log('Registering New Clan', clan);
    if (!this.state.user.userId) {
      throw new Error('You must be signed in to create a clan!');
    }
    clan.userId = this.state.user.userId;
    axios.post('/clans/', clan)
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
    axios.post('/auth/local', user)
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

  render() {
    return (
      <div>
        <Header username={this.state.user.username}/>
        <MainRouter
          user={this.state.user}
          registerNewUser={this.registerNewUser}
          loginUser={this.loginUser}
          logOut={this.logOut}
          addNewClan={this.registerNewClan}
        />
      </div>
    );
  }
}

export default App;