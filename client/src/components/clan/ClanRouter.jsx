import React from 'react';
import Forum from './Forum.jsx';
import About from './About.jsx';
import Events from './Events.jsx';
import Members from './Members.jsx';
import NewClan from './NewClan.jsx';
import ClanSearch from './ClanSearch.jsx';
import { Switch, Route, Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';

/**
 * Class representing the React Clan Container Component.
 * @extends Clan
 */

class ClanRouter extends React.Component {
  constructor (props) {
    super(props);
  }

  addNewClan(clan) {
    console.log('Added New Clan', clan);
    // TODO: post to database
  }

  clanSearch(clan) {
    console.log('Searching Clan', clan);
    // TODO: post to database
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
                <div><i>Founded: {this.props.clan.foundedDate}</i></div>
                <div><Link to='/clan/new'>New Clan Link - FOR TESTING</Link></div>
                <div><Link to='/clan/search'>Search Clan Link - FOR TESTING</Link></div>
                <div><Link to='/clan/events'>Events Clan Link - FOR TESTING</Link></div>
                <div><Link to='/clan/about'>About Clan Link - FOR TESTING</Link></div>
                <div><Link to='/clan/forum'>Forum Clan Link - FOR TESTING</Link></div>
                <div><Link to='/clan/members'>Members Clan Link - FOR TESTING</Link></div>
              </Media.Heading>
            </Media.Body>
          </Media>
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
    )
  }
}

export default ClanRouter;