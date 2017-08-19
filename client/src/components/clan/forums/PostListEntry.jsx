import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, ListGroupItem, Glyphicon, Button } from 'react-bootstrap';

/**
 * Class representing the React PostListEntry Container Component.
 * @extends PostListEntry
 */

class PostListEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  // TODO: Need to refactor to a helper function
  
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

  // TODO: Need to refactor a seperate comopennt for upvote
  
  render() {
    let timeSinceSubmission = this.getTimeSincePost(this.props.post.createdAt);
    return (
      <tr>
        <td className="text-center">
          <Row>
            <Button id="upvote" bsSize="xsmall"><Glyphicon glyph="chevron-up" /></Button>
          </Row>
          <Row>
              69
          </Row>
          <Row>
            <Button id="downvote" bsSize="xsmall"><Glyphicon glyph="chevron-down" /></Button>
          </Row>
        </td>
        <td>
          <Link to={`/clan/forums/${this.props.forum.name}/${this.props.post.id}`}>
            <p>{this.props.post.title}</p>
          </Link>
          <br/>
          <span>Submitted {timeSinceSubmission} by: </span>
          <Link to={`/users/${this.props.post.author}`}>
            {this.props.post.author}
          </Link>
          <Link to={`/clan/forums/${this.props.forum.name}/${this.props.post.id}`}>
            <p>{this.props.post.comments.length} Comments</p>
          </Link>
        </td>
      </tr>
    );
  }
}

export default PostListEntry;