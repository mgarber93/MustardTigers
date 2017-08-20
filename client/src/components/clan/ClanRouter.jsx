import React from 'react';
import axios from 'axios';
import ForumRouter from './forums/ForumRouter.jsx';
import About from './About.jsx';
import Events from './Events.jsx';
import Members from './Members.jsx';
import NewClan from './NewClan.jsx';
import ClanSearch from './ClanSearch.jsx';
import { Switch, Route, Link } from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { Media } from 'react-bootstrap';

/**
 * Class representing the React Clan Container Component.
 * @extends Clan
 */

class ClanRouter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      clan: this.props.user.clans.filter(c => Number(c.id) === Number(this.props.match.params.id))[0] || {}
    };
  }

  addNewClan(clan) {
    console.log('Added New Clan', clan);
    // TODO: post to database
    axios.post('', clan)
      .then((clan) => {
        console.log('(Client) Success! Adding New Clan', clan);
      })
      .catch((err) => {
        console.log('(Client) Error! Adding New Clan', err);
      });
  }

  clanSearch(clan) {
    console.log('Searching Clan', clan);
    // TODO: post to database
    axios.get('')
      .then((clans) => {
        console.log('Client: Success! Searching Clans', clans);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log('render', JSON.stringify(this.state.clan));
    return (
      <div className='wrapper'>
        <div className="jumbotron"> 
          <h2 className="user-name">{this.state.clan.name}</h2>
        </div>
        <main>
          <Media>
            <Media.Left align="top">
              <img width={128} height={128} src={this.state.clan.avatar} />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <div>{this.state.clan.name} </div>
                <div className="pull-right"><Button bsStyle="success">Request Invite</Button></div>
                <div><i>Founded: {this.state.clan.foundedDate}</i></div>
              </Media.Heading>
            </Media.Body>
          </Media>
          <div className="container">
            <ButtonGroup justified>
              <LinkContainer to={`/${this.state.id}/about`}>
                <Button>About</Button>
              </LinkContainer>
              <LinkContainer to={`/${this.state.id}/forums`}>
                <Button>Forums</Button>
              </LinkContainer>
              <LinkContainer to={`/${this.state.id}/events`}>
                <Button>Events</Button>
              </LinkContainer>
              <LinkContainer to={`/${this.state.id}/members`}>
                <Button>Members</Button>
              </LinkContainer>
              <LinkContainer to={`/${this.state.id}/new`}>
                <Button>New (temp)</Button>
              </LinkContainer>
              <LinkContainer to={`/${this.state.id}/search`}>
                <Button>Search (temp)</Button>
              </LinkContainer>
            </ButtonGroup>
          </div>
          {/* <Switch>
            <Route
              exact path='/clan/new' 
              render={(props) => <NewClan {...props} addNewClan={this.addNewClan.bind(this)}/>}
            />
            <Route
              exact path='/clan/search' 
              render={(props) => <ClanSearch {...props} clan={this.props.clan} clanSearch={this.clanSearch.bind(this)}/>}
            />
            <Route
              path='/clan/forums'
              render={(props) => <ForumRouter {...props} clan={this.props.clan} />}
            />
            <Route
              exact path='/clan/members' 
              render={(props) => <Members {...props} clan={this.props.clan}/>}
            />
            <Route 
              exact path='/clan/:number/forums' 
              component={ForumRouter} 
            />
            <Route 
              exact path='/clan/:number/about' 
              component={About} 
            />
            <Route 
              exact path='/clan/:number/members' 
              component={Members} 
            />
            <Route 
              exact path='/clan/:number/events' 
              component={Events} 
            />
          </Switch> */}
        </main>
      </div>
    );
  }
}

export default ClanRouter;