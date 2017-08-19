import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, ListGroupItem, Glyphicon } from 'react-bootstrap';

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
      // TODO: update where the data is coming right, changing it to state
      //       for now to allow for testing.
      // TODO: Need to update the clan paths, right now they arent RESTful
      <tr>
        <td className="text-center"><Glyphicon glyph={this.props.forum.avatar}/></td>
        <td>
          <Link to={`/clan/forums/${this.props.forum.name}`}>{this.props.forum.name}</Link><br/>
          {this.props.forum.description}
        </td>
        <td>{this.props.forum.posts.length}</td>
        <td>{this.props.forum.posts.length}</td>
      </tr>
    );
  }
}

export default ForumListEntry;