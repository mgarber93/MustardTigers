// Libraries
import React from 'react';

// React Router Components
import {Link} from 'react-router-dom';

//React Bootstrap Components
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';

/**
 * Class representing the React NewPostComment Component.
 * @extends NewPostComment
 */
 
class NewPostComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: {
        body: '',
        author: 'currentUser'
      },
    };
  }

  handleChange(e) {
    this.setState({
      comment: Object.assign(this.state.comment, {[e.target.id]: e.target.value})
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewPostComment(this.state.comment);
  }

  render () {
    return (
      <Grid>
        <Row>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="body">
              <Col componentClass={ControlLabel} sm={2}>Comment Body</Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Mustard Tigers" value={this.state.body} onChange={this.handleChange.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={1}>
                <ButtonToolbar>
                  <Button type="submit" bsStyle="success">Add Comment</Button>
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
export default NewPostComment;