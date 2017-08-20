import React, {Component} from 'react';
import NewClan from './clan/NewClan.jsx';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

const User = ({user, clans, addNewClan}) => (
  <div> 
    <h2 className="user-name">Welcome back {user.username}</h2>
    <grid>
      {clans.map(clan => (<row key={clan.id}>{clan.name}</row>))}
    </grid>
    <section>
      <NewClan addNewClan={addNewClan}/>
    </section>
  </div>
);

export default User;