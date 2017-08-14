import axios from 'axios';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';

/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
const Login = ({loginUser}) => (
  <div className="container">
    <Jumbotron>
      <LoginForm action={loginUser} controlLabel="Login">
      </LoginForm>
    </Jumbotron>
  </div>
);
export default Login;