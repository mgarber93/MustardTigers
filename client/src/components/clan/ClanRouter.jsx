import React from 'react';
import axios from 'axios';
import Forum from './Forum.jsx';
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

    //DUMMY DATA
    this.state = {
      posts: [
        {
          title: 'First Post',
          body: 'This is the body of the first post. It is very interesting',
          pinned: false
        },
        {
          title: 'Second Post',
          body: 'This is the body of the second post. It is very interesting',
          pinned: false
        },
        {
          title: 'Third Post',
          body: 'This is the body of the third post. It is very interesting',
          pinned: false
        },
      ]
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

    return (
      <div className='wrapper'>
        <main>
          <Media>
            <Media.Left align="top">
              <img width={128} height={128} src={this.props.clan.clanAvatar} />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <div>{this.props.clan.clanName} </div>
                <div className="pull-right"><Button bsStyle="success">Request Invite</Button></div>
                <div><i>Founded: {this.props.clan.foundedDate}</i></div>
              </Media.Heading>
            </Media.Body>
          </Media>
          <div className="container">
            <ButtonGroup justified>
              <LinkContainer to="/clan/about">
                <Button>About</Button>
              </LinkContainer>
              <LinkContainer to="/clan/forum">
                <Button>Forum</Button>
              </LinkContainer>
              <LinkContainer to="/clan/events">
                <Button>Events</Button>
              </LinkContainer>
              <LinkContainer to="/clan/members">
                <Button>Members</Button>
              </LinkContainer>
              <LinkContainer to="/clan/new">
                <Button>New (temp)</Button>
              </LinkContainer>
              <LinkContainer to="/clan/search">
                <Button>Search (temp)</Button>
              </LinkContainer>
            </ButtonGroup>
          </div>
          <Switch>
            <Route
              exact path='/clan/new' 
              render={(props) => <NewClan {...props} addNewClan={this.addNewClan.bind(this)}/>}
            />
            <Route
              exact path='/clan/search' 
              render={(props) => <ClanSearch {...props} clan={this.props.clan} clanSearch={this.clanSearch.bind(this)}/>}
            />
            <Route
              exact path='/clan/forum' 
              render={(props) => <Forum {...props} clan={this.props.clan} posts={this.state.posts}/>}
            />
            <Route
              exact path='/clan/members' 
              render={(props) => <Members {...props} clan={this.props.clan}/>}
            />
            <Route 
              exact path='/clan/:number/forum' 
              component={Forum} 
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
          </Switch>
        </main>
      </div>
    );
  }
}

export default ClanRouter;