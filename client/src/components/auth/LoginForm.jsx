import React from 'react';
<<<<<<< HEAD
import {Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
=======
import { Button, Glyphicon, Jumbotron } from 'react-bootstrap';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FieldGroup, FormGroup, ControlLabel } from 'react-bootstrap';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
>>>>>>> Correct style mistakes
/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render () {
    return (
<<<<<<< HEAD
      <Grid>
        <Row>
        Username 
        <input name="username" placeholder="Bubbles" onChange={this.handleChange.bind(this)}/>
        Password:
        <input name="password" type="password" placeholder="" onChange={this.handleChange.bind(this)}/>
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
        </Row>
      </Grid>
    )
=======
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
    );
>>>>>>> Correct style mistakes
  }
}
export default LoginForm;