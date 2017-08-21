// Libraries
import React from 'react';

// React Router Components
import { Link } from 'react-router-dom';

// React Bootstrap Components
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

  render() {
    let timeSinceSubmission = this.getTimeSincePost(this.props.post.createdAt);

    return (
      <tr>
        <td className="text-center">
          <Row>
            <Button id="upvote" bsSize="xsmall"><Glyphicon glyph="chevron-up" /></Button>
          </Row>
          <Row>
            <div>
              69
            </div>
          </Row>
          <Row>
            <Button id="downvote" bsSize="xsmall"><Glyphicon glyph="chevron-down" /></Button>
          </Row>
        </td>
        <td>
          <Link to={`/${this.props.clan.id}/forums/${this.props.forum.id}/${this.props.post.id}`}>
            <p>{this.props.post.title}</p>
          </Link>
          <br/>
          <span>Submitted {timeSinceSubmission} by: </span>
          <Link to={`/users/${this.props.post.author}`}>
            {this.props.post.author}
          </Link>
          <Link to={`/${this.props.clan.id}/forums/${this.props.forum.id}/${this.props.post.id}`}>
            {/* <p>{this.props.post.comments.length ? } Comments</p> */}
          </Link>
        </td>
      </tr>
    );
  }
}

export default PostListEntry;