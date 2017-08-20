import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

const divStyle = {
  display: 'inline-block',
  height: '140px',
  width: '140px',
}; 

export default ({id, name, tag, avatar, description}) => (
  <div className="row">
    <div className="col-sm-6 col-md-4">
      <div className="thumbnail">
        <img 
          src={avatar} 
          alt="Clan's avatar picture"
          style={divStyle}
        />
        <div className="caption">
          <h3>{name}</h3>
          <p>{tag}</p>
          <p>{description}</p>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      </div>
    </div>
  </div>
);