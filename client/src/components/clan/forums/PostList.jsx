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
  }

  componentDidMount() {
    console.log(this.props.posts);
    // let posts = this.props.posts.map((post, i) => {
    //   return <PostListEntry clan={this.props.clan} post={post} forum={this.props.forum} key={i} />;
    // });
    //console.log(posts);
  }

  render() {
    if (this.props.posts.length) {
      let posts = this.props.posts.map((post, i) => {
        return <PostListEntry clan={this.props.clan} post={post} forum={this.props.forum} key={i} />;
      });
      return (
        <tbody>
          {posts}
        </tbody>
      );
    } else {
      return (
        <tbody>
          No Posts on this forum. Submit a new post.
        </tbody>
      );
    }
  }
}

export default PostList;