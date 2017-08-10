import axios from 'axios';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';

/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
class Register extends React.Component {
  userRegister (user) {
    axios.post('/users', user)
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
          <LoginForm action={this.userRegister.bind(this)} controlLabel="Register" />
        </Jumbotron>
      </div>
    );
  }
}
export default Register;