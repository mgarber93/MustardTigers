import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Media, Well, Image } from 'react-bootstrap';
import { Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap';

/**
 * 
 * @todo Add User as Friend
 * @todo Inform user to successful friend add
 * @todo: Need to show Add friend when not looking own profile
 */
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAddFriend() {
    console.log('Friend Added!');
  }

  render() {
    return (
      <Media>
        <Media.Left align="top">
          <Image width={64} height={64} src={this.props.user.image} alt={this.props.user.username}/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>
            <div>{this.props.user.username} </div>
            <div>Member Since: <i>{this.props.user.joinedDate}}</i></div>
          </Media.Heading>
          <Well bsSize="small">{this.props.user.bio}</Well>
          <ButtonToolbar>
            <Button bsSize="small" onClick={this.handleAddFriend.bind(this)}><Glyphicon glyph="plus-sign"/>Add Friend</Button>
          </ButtonToolbar>
        </Media.Body>
      </Media>
    );
  }
}

UserProfile.propTypes = {
  user: propTypes.object
};

export default UserProfile;