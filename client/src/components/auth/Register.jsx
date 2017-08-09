import React from 'react'
import { Jumbotron } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx'

/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.userRegister.bind(this);
    this.state = {
      controlLabel: 'Register'
    }
  }

  userRegister () {
    console.log('Register Sucess')
  }

  render () {
    return (
      <div className="container">
        <Jumbotron>
          <LoginForm action={this.userRegister} controlLabel={this.state.controlLabel}/>
        </Jumbotron>
      </div>
    )
  }
}
export default Register;