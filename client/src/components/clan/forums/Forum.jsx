import React from 'react';

// React Components
import PostList from './PostList.jsx';

// React Router Bootstrap Components
import { LinkContainer } from 'react-router-bootstrap';

// React BootStrap
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';
/**
 * Class representing the React Forum Container Component.
 * @extends Forum
 */

class Forum extends React.Component {
  constructor (props) {
    super(props);
  }

  getForumInfo() {
    //Matches forumName to Route ForumName
    return this.props.forums.filter((forum) => {
      return forum.name === this.props.match.params.name;
    });
  }

  componentWillMount () {
    this.props.updateForum(this.getForumInfo()[0]);
  }

  render() {
    let forum = this.getForumInfo()[0];

    return (
      <div>
        <Grid>
          <div className="pull-right">
            <LinkContainer to={`/clan/forums/${forum.name}/new`}>
              <Button bsStyle="success">
                Add New Post
              </Button>
            </LinkContainer>
          </div>
          <Row>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th colSpan="2">Forum Posts</th>
                </tr>
              </thead>
              <PostList forum={forum}/>
            </Table>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Forum;