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
  }

  render () {
    return (
      <div className="container">
        <Jumbotron>
          <LoginForm />
        </Jumbotron>
      </div>
    );
  }
}
export default Login;