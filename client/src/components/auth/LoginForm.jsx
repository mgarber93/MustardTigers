import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ControlLabel, Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
/**
 * Class representing the React Login Component.
 * @extends Login
 */
 
class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isValid: ''
    };
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  getUsernameValidationState() {
    const length = this.state.username.length;
    if (length > 3) return 'success';
    else if (length > 0) return 'error';
  }

  getPasswordValidationState() {
    const length = this.state.password.length;
    if (length > 5) {
      return 'success';
    } else if (length > 0) {
      return 'error'; 
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
    this.props.history.push('/');
  }

  render () {
    return (
      <Grid>
        <Row>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="username" validationState={this.getUsernameValidationState()}>
              <Col componentClass={ControlLabel} sm={2}>Username</Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Bubbles" value={this.state.username} onChange={this.handleChange.bind(this)} />
              </Col>
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="password" validationState={this.getPasswordValidationState()}>
              <Col componentClass={ControlLabel} sm={2}>Password</Col>
              <Col sm={4}>
                <FormControl type="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
                <HelpBlock>Password must be at least (6) six characters.</HelpBlock>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={1}>
                <Button type="submit">{this.props.controlLabel}</Button>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Grid>
    );
  }
}
export default LoginForm;