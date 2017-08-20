import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import axios from 'axios';

const divStyle = {
  display: 'inline-block',
  height: '140px',
  width: '140px',
}; 

const deleteClan = (id, rerender) => {
  console.log(id, rerender);
  return axios.delete(`/api/clans/${id}`)
    .then(rerender);
};

export default ({id, name, tag, avatar, description, rerender}) => (
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
          <LinkContainer to={`/${id}`}>
            <Button bsStyle="primary">Go</Button>
          </LinkContainer>
          <Button onClick={() => deleteClan(id, rerender)}>Delete</Button>
        </div>
      </div>
    </div>
  </div>
);