import axios from 'axios';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';

/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
const Register = ({registerUser, history}) => (
  <div className="container">
    <Jumbotron>
      <LoginForm action={registerUser} history={history} controlLabel="Register" />
    </Jumbotron>
  </div>
);

export default Register;