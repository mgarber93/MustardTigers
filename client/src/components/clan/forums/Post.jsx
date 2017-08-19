import React from 'react';

//React Router Components
import { Link } from 'react-router-dom';

// React Router Bootstrap Components
import {LinkContainer} from 'react-router-bootstrap';

// React Components
import Comments from './Comments.jsx';

// React Bootstrap Components
import { ButtonGroup, Button, Glyphicon, Well, Table, Grid, Row, Col } from 'react-bootstrap';

/**
 * Class representing the React Post Container Component.
 * @extends Post
 */

class Post extends React.Component {
  constructor (props) {
    super(props);
    this.handleDownVote.bind(this);
    this.handleUpVote.bind(this);
    this.state = {
      post: {},
      votes: 0
    };
  }

  handleUpVote (e) {
    console.log('Upvoted');
  }

  handleDownVote (e) {
    console.log('Downvoted');
  }

  filterCurrentPost() {
    //Matches forumName to Route ForumName
    return this.props.forum.posts.filter((post) => {
      return post.id === this.props.match.params.id;
    });
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
    let post = this.filterCurrentPost()[0];
    let timeSinceSubmission = this.getTimeSincePost(post.createdAt);
    return (
      <div>
        <Grid>
          <Row>
            <div className="pull-right">
              <LinkContainer to={`/clan/forums/${this.props.forum.name}/${post.id}/new`}>
                <Button bsStyle="success">
                  Add New Comment
                </Button>
              </LinkContainer>
            </div>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th colSpan="2">{post.title}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    <Row>
                      <Button id="upvote" bsSize="xsmall"><Glyphicon glyph="chevron-up" /></Button>
                    </Row>
                    <Row>
                        82
                    </Row>
                    <Row>
                      <Button id="downvote" bsSize="xsmall"><Glyphicon glyph="chevron-down" /></Button>
                    </Row>
                  </td>
                  <td>
                    <p>{post.body}</p>
                    <br/>
                    <span>Submitted {timeSinceSubmission} by: </span>
                    <Link to={`/users/${post.author}`}>
                      {post.author}
                    </Link>
                    <Link to={`/clan/forums/${this.props.forum.name}/${post.id}`}>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Grid>
        <Comments comments={post.comments} />
      </div>
    );
  }
}

export default Post;