import React from 'react'
import { Jumbotron } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx'

/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.userLogin.bind(this);
    this.state = {
      controlLabel: 'Login'
    }
  }

  userLogin () {
    console.log('Login Sucess')
  }

  render () {
    return (
      <div className="container">
        <Jumbotron>
          <LoginForm action={this.userLogin} controlLabel={this.state.controlLabel}/>
        </Jumbotron>
      </div>
    )
  }
}
export default Login;