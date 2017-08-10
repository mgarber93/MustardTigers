import React from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * Class representing the React ForumEntry Container Component.
 * @extends ForumEntry
 */

class ForumEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {

    //I don't know how to get two fields side by side in bootstrap, ask talis tomorrow

    return (
      <div className='post'>
        <well>
          <div>{this.props.post.upvotes}&#9651;</div><br />
          <div>{this.props.post.downvotes}&#9661;</div><br />
        </well>
        <well>
          <h3>{this.props.post.title}</h3>
          <span>{this.props.post.body}</span>
        </well>
      </div>
    )
  }
}

export default ForumEntry;