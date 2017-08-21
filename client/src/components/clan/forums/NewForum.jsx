// Libraries
import React from 'react';

// React Router Components
import {Link} from 'react-router-dom';

//React Bootstrap Components
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';

/**
 * Class representing the React NewForum Component.
 * @extends NewForum
 */
 
class NewForum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forum: {
        name: ''
      },
    };
  }

  handleChange(e) {
    this.setState({
      forum: Object.assign(this.state.forum, {[e.target.id]: e.target.value})
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewForum(this.state.forum);
    this.props.history.push(`/${this.props.clan.id}/forums`);
  }

  render () {
    return (
      <Grid>
        <Row>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} sm={2}>Forum Name</Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="General Discussion" value={this.state.forum.name} onChange={this.handleChange.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={1}>
                <ButtonToolbar>
                  <Button type="submit" bsStyle="success">Add Forum</Button>
                  <Button href="/" bsStyle="danger">Cancel</Button>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Grid>
    );
  }
}
export default NewForum;