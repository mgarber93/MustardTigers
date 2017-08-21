import React from 'react';
import ForumEntry from './ForumEntry.jsx';
import { Switch, Route } from 'react-router-dom';

/**
 * Class representing the React Forum Container Component.
 */
class Forum extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {

    var posts = this.props.posts.map((post, i) => {
      return <ForumEntry post={post} key={i} />;
    });

    return (
      <div>
        {posts}
      </div>
    );
  }
}

export default Forum;