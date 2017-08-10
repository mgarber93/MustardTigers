import React from 'react';
import axios from 'axios';
import MainRouter from './MainRouter.jsx';
import Header from './Header.jsx';
import { Route, Redirect } from 'react-router';

/**
 * Class representing the App.
 * @extends App
 */
 
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // TODO: Get all users
    // TODO: Get all Messages
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

  loginUser(user) {
    console.log('(Client) Logging in User');
    axios.post('/auth/local', user)
      .then(data => {
        console.log('(Client) Logging in User');
        //Set State here or at registration sucess?
      })
      .catch((err) => {
        console.log('(Client) Success! Logging in User');
      });
  }

  render () {
    return (
      <div>
        <Header />
        <MainRouter
          registerNewUser={this.registerNewUser.bind(this)}
          loginUser={this.loginUser.bind(this)}
        />
      </div>
    );
  }
}

export default App;