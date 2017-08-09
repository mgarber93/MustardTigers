import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FieldGroup, FormGroup, ControlLabel, Jumbotron } from 'react-bootstrap';

/**
 * Class representing the React Register Component.
 * @extends Register
 */
 
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{
        username: '',
        password: '',
      },
      isLoggedIn: false
    };
  }

  onChange(e) {
    this.setState({
      user: Object.assign(this.state.user, {[e.target.id]: e.target.value})
    });
  }

  onSubmit () {
    this.props.registerNewUser(this.state.user);
    this.setState({isLoggedIn: true});
  }

  render () {
    return (
      <div className="container">
        <Jumbotron>
          <FormGroup>
            <ControlLabel>Register</ControlLabel>
            <FormControl id='username' type='text' onChange={this.onChange.bind(this)} placeholder='Username' />
            <FormControl id='password' type='password' onChange={this.onChange.bind(this)} placeholder='Password' />
            <Button onClick={this.onSubmit.bind(this)} type='submit'>Submit</Button>
          </FormGroup>
        </Jumbotron>
      </div>
    );
  }
}
export default Register;