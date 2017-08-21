import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button, Panel, Image, Thumbnail } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Class representing the React MemberEntry Container Component.
 * @todo Need data for Clan Owner to show who is the leader of the clan
 */
class MemberEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <Col sm={4}>
        <Panel>
          <Row className="show-grid">
            <Col md={3}>
              <img src={this.props.member.userAvatar} width={64}/>
            </Col>
            <Col md={6}>
              <div><Link to={`/users/${this.props.member.username}`}>{this.props.member.username}</Link></div>
              <div>{this.props.member.memberRole}</div>
              <div>{this.props.member.memberSince}</div>
            </Col>
          </Row>
        </Panel>
      </Col>
    );
  }
}

MemberEntry.propTypes = {
  member: PropTypes.object,
};

export default MemberEntry;