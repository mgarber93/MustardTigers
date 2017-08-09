import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
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
      <Grid>
        <Row>
        Username 
          <input name="username" placeholder="Bubbles" onChange={this.handleChange.bind(this)}/>
        Password:
          <input name="password" type="password" placeholder="" onChange={this.handleChange.bind(this)}/>
          <button onClick={this.handleSubmit.bind(this)}>{this.props.controlLabel}</button>
        </Row>
      </Grid>
    );
  }
}
export default LoginForm;