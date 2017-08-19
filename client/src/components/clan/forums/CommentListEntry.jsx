import React from 'react';

//React Router Components
import { Link } from 'react-router-dom';

// React BootStrap Components
import { Row, Col, Well } from 'react-bootstrap';

class CommentListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  getTimeSincePost (postTime) {
    let postDateMilliseconds = new Date(postTime).getTime();
    let currentDateMilliseconds = new Date().getTime();

    let diff = Math.abs(currentDateMilliseconds - postDateMilliseconds);
    let seconds = (diff / 1000).toFixed(0);

    if (seconds < 60) {
      return seconds + ' seconds ago ';
    } else {
      let minutes = Math.floor(seconds / 60);
      if (minutes < 60) {
        return minutes + ' minutes ago ';
      } else {
        let hours = Math.floor(minutes / 60);
        if (hours < 24) {
          return hours + ' hours ago';
        } else {
          let days = Math.floor(hours / 24);
          return days + ' days ago ';
        }
      }
    }

    return 0;
  }

  render () {
    let timeSinceSubmission = this.getTimeSincePost(this.props.comment.createdAt);
    return (
      <Row className="show-grid">
        <Col sm={1}>
          Upvote
        </Col>
        <Col sm={10}>
          <Well bsSize="small">
            <p>{this.props.comment.body}</p>
            <br/>
            <span>Submitted {timeSinceSubmission} by: </span>
            <Link to={`/users/${this.props.comment.author}`}>
              {this.props.comment.author}
            </Link>
          </Well>
        </Col>
      </Row>
    );
  }
}
export default CommentListEntry;