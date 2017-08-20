import React from 'react';
import PostListEntry from './PostListEntry.jsx';
import Forum from './Forum.jsx';
import { Switch, Route } from 'react-router-dom';
import { Grid, Row, Col, ListGroup, Table } from 'react-bootstrap';

/**
 * Class representing the React PostList Container Component.
 * @extends PostList
 */

class PostList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      forum: {},
    };
  }

  componentWillMount () {
    this.setState({
      forum: this.props.forum
    });
  }

  render() {
    var posts = this.state.forum.posts.map((post, i) => {
      return <PostListEntry clan={this.props.clan} post={post} forum={this.state.forum} key={i} />;
    });

    return (
      <tbody>
        {posts}
      </tbody>
    );
  }
}

export default PostList;