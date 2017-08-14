import React from 'react';
import Home from './Home.jsx';
import ClanRouter from './clan/ClanRouter.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import { Switch, Route } from 'react-router-dom';
import User from './User.jsx';

/**
 * Class representing the React Main Container Component.
 * @extends Main
 */

class MainRouter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      //BOGUS TEST DATA
      clan: {
        clanName: 'Mustard Tigers',
        clanTag: 'MST',
        clanAvatar: 'https://avatars1.githubusercontent.com/u/30813487?v=4&s=200',
        description: 'This is the best clan in all the world',
        foundedDate: 'July 2017'
      }
    };
  }

  /**
   * Use /users/:username as a valid endpoint since userId's are used to retrieve
   * JSON data.
   */
  render() {
    return (
      <div className='wrapper'>
        <main>
          <Switch>
            <Route 
              exact path='/' 
              component={Home} 
            />
            <Route 
              path='/login' 
              component={props => <Login {...props} loginUser={this.props.loginUser}/>}/>
            <Route 
              path='/register' 
              component={Register} />
            <Route
              path='/clan' 
              render={(props) => <ClanRouter {...props} clan={this.state.clan}/>}/>
            <Route
              path='/users/*' 
              render={(props) => <User user={this.props.user} addNewClan={this.props.addNewClan}/>}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default MainRouter;