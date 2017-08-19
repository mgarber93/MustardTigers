import React from 'react';

// React Components
import CommentListEntry from './CommentListEntry.jsx';

// React BootStrap Components
import { Grid } from 'react-bootstrap';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let comments = this.props.comments.map((comment, i)=>{
      return <CommentListEntry comment={comment} key={i} />;
    });

    return (
      <Grid>
        {comments}
      </Grid>
    );
  }
}
export default CommentList;