// Libraries
import React from 'react';

// React Router Components
import { Link } from 'react-router-dom';

// React Bootstrap Components
import { Glyphicon } from 'react-bootstrap';

/**
 * Class representing the React ForumListEntry Container Component.
 * @extends ForumListEntry
 */

class ForumListEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    let postCount = 0;
    if (this.props.forum.posts) {
      postCount = this.props.forum.posts.length;
    }

    return (
      <tr>
        <td className="text-center"><Glyphicon glyph="th-list"/></td>
        <td>
          <Link to={`/${this.props.clan.id}/forums/${this.props.forum.id}`}>{this.props.forum.name}</Link><br/>
          Description Will go here
        </td>
        <td>{postCount}</td>
        <td> 0 {/* Comment Counts */}</td>
      </tr>
    );
  }
}

export default ForumListEntry;