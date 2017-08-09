import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';

/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controlLabel: 'Login'
    };
  }

  userLogin (user) {
    console.log('Login Sucess', user);
  }

  render () {
    return (
      <div className="container">
        <Jumbotron>
          <LoginForm action={this.userLogin.bind(this)} controlLabel={this.state.controlLabel}>
          </LoginForm>
        </Jumbotron>
      </div>
    );
  }
}
export default Login;