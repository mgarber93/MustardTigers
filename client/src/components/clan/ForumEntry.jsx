import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ButtonGroup, Button, Glyphicon, Well } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Class representing the React ForumEntry Container Component.
 */
class ForumEntry extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      votes: 0
    };

    this.handleDownVote.bind(this);
    this.handleUpVote.bind(this);
  }

  handleUpVote (e) {
    console.log('Upvoted');
    let votes = this.state.votes;
    this.setState({
      votes: votes++
    });
  }

  handleDownVote (e) {
    console.log('Downvoted', this.state);
    let votes = this.state.votes;
    this.setState({
      votes: votes--
    });
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={1}>
            <Row className="show-grid">
              <Button id="upvote" bsSize="xsmall" onClick={this.handleUpVote}><Glyphicon glyph="chevron-up" /></Button>
            </Row>
            <Row className="show-grid">
              {this.props.post.votes} 69
            </Row>
            <Row className="show-grid">
              <Button id="downvote" bsSize="xsmall" onClick={this.handleDownVote}><Glyphicon glyph="chevron-down" /></Button>
            </Row>
          </Col>
          <Col sm={10}>
            <Well bsSize="small">
              <h4>{this.props.post.title}</h4>
              <span>{this.props.post.body}</span>
              <div className="pull-right">
                {this.props.post.createdAt} CREATED DATE
              </div>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ForumEntry.propTypes = {
  post: PropTypes.object,
};

export default ForumEntry;