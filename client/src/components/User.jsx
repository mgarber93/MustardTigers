import React, {Component} from 'react';
import NewClan from './clan/NewClan.jsx';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Clan from './clan/Clan.jsx';

/**
 * Render a Clan component for each clan the user owns. If the user has less 
 * than 5 clans render a new clan component. 
 * 
 * @param {object} props
 */
const User = ({user, clans, addNewClan, rerender}) => (
  <div> 
    <div className="jumbotron"> 
      <h2 className="user-name">Welcome back {user.username}</h2>
    </div>
    <grid>
      {(clans || []).map(clan => <Clan key={clan.id} {...clan} rerender={rerender} />)}
    </grid>
    {(clans || []).length < 5 &&
    <section>
      <NewClan addNewClan={addNewClan}/>
    </section>
    }
  </div>
);

export default User;