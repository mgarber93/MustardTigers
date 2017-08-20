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

    return (
      <tr>
        <td className="text-center"><Glyphicon glyph={this.props.forum.avatar}/></td>
        <td>
          <Link to={`/${this.props.clan.id}/forums/${this.props.forum.id}`}>{this.props.forum.name}</Link><br/>
          {this.props.forum.description}
        </td>
        <td>{this.props.forum.posts.length}</td>
        <td>{this.props.forum.posts.length}</td>
      </tr>
    );
  }
}

export default ForumListEntry;