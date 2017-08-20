// Libraries
import React from 'react';

//React Router Components
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

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

  filterCurrentPost(forum) {
    //Matches forumName to Route ForumName
    console.log(forum);
    return forum.posts.filter((post) => {
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

  componentWillMount() {
    let url = this.props.match.url.split('/');
    let forumId = url[url.length - 2].toString();
    let currentForum = this.props.forums.filter((forum) => { return forum.id === forumId; });
    let currentPost = currentForum[0].posts.filter((post) => { return post.id === this.props.match.params.id; });
    this.setState({
      forum: currentForum[0],
      post: currentPost[0]
    });
  }
  
  render() {
    let timeSinceSubmission = this.getTimeSincePost(this.state.post.createdAt);
    return (
      <div>
        <Grid>
          <Row>
            <div className="pull-right">
              <LinkContainer to={`/${this.props.clan.id}/forums/${this.state.forum.id}/${this.state.post.id}/new`}>
                <Button bsStyle="success">
                  Add New Comment
                </Button>
              </LinkContainer>
            </div>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th colSpan="2">{this.state.post.title}</th>
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
                    <p>{this.state.post.body}</p>
                    <br/>
                    <span>Submitted {timeSinceSubmission} by: </span>
                    <Link to={`/users/${this.state.post.author}`}>
                      {this.state.post.author}
                    </Link>
                    <Link to={`/${this.props.clan.id}/forums/${this.state.forum.id}/${this.state.post.id}`}>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Grid>
        <Comments comments={this.state.post.comments} />
      </div>
    );
  }
}

export default Post;