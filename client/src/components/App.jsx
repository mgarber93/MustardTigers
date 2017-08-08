import React from 'react';
import { Route, Redirect } from 'react-router'
import Header from './Header.jsx';
import Main from './Main.jsx';
import axios from 'axios';

/**
 * Class representing a dot.
 * @extends App
 */
 class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //TODO: Get all users
    //TODO: Get all Messages
  }

  registerNewUser(user) {
    console.log('(Client) Registering New User')
    axios.post('/auth/user', user)
      .then((data) => {
        console.log('(Client) Success! Registering New User')
        //Set State here or at registration sucess?
      })
      .catch((err) => {
        console.log('(Client) Success! Registering New User')
      });
  }

  render () {

    return (
      <Header />
      <Main
        registerNewUser={this.registerNewUser.bind(this)}
      />
    )
  }
 }