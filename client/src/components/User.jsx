import React, {Component} from 'react';
import NewClan from './clan/NewClan.jsx';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Clan from './clan/Clan.jsx';

const User = ({user, clans, addNewClan, rerender}) => (
  <div> 
    <div className="jumbotron"> 
      <h2 className="user-name">Welcome back {user.username}</h2>
    </div>
    <grid>
      {(clans || []).map(clan => <Clan key={clan.id} {...clan} rerender={rerender} />)}
    </grid>
    <section>
      <NewClan addNewClan={addNewClan}/>
    </section>
  </div>
);

export default User;