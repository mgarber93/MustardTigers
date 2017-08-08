import React from 'react'
import { Button, Glyphicon, Jumbotron } from 'react-bootstrap';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FieldGroup, FormGroup, ControlLabel } from 'react-bootstrap';
import TextFieldGroup from '../common/TextFieldGroup.jsx'
/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(e) {
    this.setState({[e.target.value]: e.target.value});
  }

  render () {
    const { errors, identifier, password, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
      </form>
    )
  }
}
export default LoginForm;