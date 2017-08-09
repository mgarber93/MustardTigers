import React from 'react';
import { Link } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Media} from 'react-bootstrap';
import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap';

class ChannelListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Media>
        <Media.Left align="top">
          <img width={64} height={64} src='IMG_SOURCE' alt='USERNAME'/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>
            <div>USERNAME</div>
          </Media.Heading>
          <Well bsSize="small">MESSSAGE_TEXT</Well>
          <h5>TIME_STAMP</h5>
        </Media.Body>
      </Media>
    );
  }
}

export default ChannelListEntry;