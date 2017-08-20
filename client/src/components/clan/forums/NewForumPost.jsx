// Libraries
import React from 'react';

// React Router Components
import {Link} from 'react-router-dom';

//React Bootstrap Components
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';

/**
 * Class representing the React NewForumPost Component.
 * @extends NewForumPost
 */
 
class NewForumPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        body: '',
        author: 'currentUser'
      },
    };
  }

  handleChange(e) {
    this.setState({
      post: Object.assign(this.state.post, {[e.target.id]: e.target.value})
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewForumPost(this.state.post);
  }

  render () {
    return (
      <Grid>
        <Row>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="title">
              <Col componentClass={ControlLabel} sm={2}>Post Title</Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Mustard Tigers" value={this.state.title} onChange={this.handleChange.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup controlId="body">
              <Col componentClass={ControlLabel} sm={2}>Post Body</Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Mustard Tigers" value={this.state.body} onChange={this.handleChange.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={1}>
                <ButtonToolbar>
                  <Button type="submit" bsStyle="success">Add Post</Button>
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
export default NewForumPost;