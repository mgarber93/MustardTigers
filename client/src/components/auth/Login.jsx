import axios from 'axios';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';

/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
class Login extends React.Component {
  /**
   * Receive and post a user object to the server
   * @param {Object} user Has a `username` and `password` property
   * @todo Redirect on success or inform user on failure
   */
  userLogin (user) {
    axios.post('/auth/local', user)
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render () {
    return (
      <div className="container">
        <Jumbotron>
          <LoginForm action={this.userLogin.bind(this)} controlLabel="Login">
          </LoginForm>
        </Jumbotron>
      </div>
    );
  }
}
export default Login;