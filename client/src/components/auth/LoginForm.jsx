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

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  render () {
    return (
      <Grid>
        <Row>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="username">
              <Col componentClass={ControlLabel} sm={2}>Username</Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Bubbles" value={this.state.username} onChange={this.handleChange.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup controlId="password">
              <Col componentClass={ControlLabel} sm={2}>Password</Col>
              <Col sm={4}>
                <FormControl type="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
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