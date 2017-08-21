import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Media, Well, Image } from 'react-bootstrap';
import { Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * 
 * @todo Add User as Friend
 * @todo Inform user to successful friend add
 * @todo Need to show Add friend when not looking own profile
 */
class ClanSearchEntry extends Component {
  constructor(props) {
    super(props);
  }

  joinClan() {
    console.log('Friend Added!');
  }

  render() {
    return (
      <Media>
        <Media.Left align="top">
          <Image width={64} height={64} src={this.props.clan.clanAvatar} alt={this.props.clan.clanName}/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>
            <div>{this.props.clan.clanName} </div>
            <div>Member Since: <i></i></div>
          </Media.Heading>
          <Well bsSize="small">{this.props.clan.description}</Well>
          <ButtonToolbar>
            <Button bsSize="small" onClick={this.joinClan.bind(this)}><Glyphicon glyph="plus-sign"/>Join Clan</Button>
          </ButtonToolbar>
        </Media.Body>
      </Media>
    );
  }
}

ClanSearchEntry.propTypes = {
  clan: PropTypes.object,
};

export default ClanSearchEntry;