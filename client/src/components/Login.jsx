import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FieldGroup, FormGroup, ControlLabel } from 'react-bootstrap';

/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:{
        username: '',
        password: '',
      },
      isLoggedIn: false
    }
  }

  onChange(e) {
    this.setState({
      user: Object.assign(this.state.user, {[e.target.id]: e.target.value})
    })
  }

  submitLogin () {
    this.props.registerNewUser(this.state.user);
    this.setState({isLoggedIn: true});
  }

  render () {

    //TODO: Refactor the Form to a new Component
    return (
      <FormGroup>
        <ControlLabel>Login</ControlLabel>
          <FormControl id='username' type='text' onChange={this.onChange.bind(this)} placeholder='Username' />
          <FormControl id='password' type='password' onChange={this.onChange.bind(this)} placeholder='Password' />
        <Button onClick={this.submitLogin.bind(this)} type='submit'>Submit</Button>
      </FormGroup>
    )
  }
}
export default Login;