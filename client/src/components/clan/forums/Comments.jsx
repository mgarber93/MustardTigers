import React from 'react';
import CommentList from './CommentList.jsx';

class Comments extends React.Component {
  constructor(props) {
    super(props);

  }
  render () {

    return (
      <div>
        <CommentList comments={this.props.comments}/>
      </div>
    );
  }
}
export default Comments;