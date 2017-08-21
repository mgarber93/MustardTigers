import React from 'react';
import Home from './Home.jsx';
import ClanRouter from './clan/ClanRouter.jsx';
import Login from './auth/Login.jsx';
import Logout from './auth/Logout.jsx';
import Register from './auth/Register.jsx';
import About from './About.jsx';
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
        id: '12',
        name: 'Mustard Tigers',
        clanName: 'Mustard Tigers',
        clanTag: 'MST',
        clanAvatar: 'https://avatars1.githubusercontent.com/u/30813487?v=4&s=200',
        description: 'This is the best clan in all the world',
        foundedDate: 'July 2017',
        members: [
          {
            username: 'TNauda',
            userAvatar: 'https://avatars1.githubusercontent.com/u/30813487?v=4&s=200',
            memberRole: 'Nerd',
            memberSince: 'July 2017'
          },
          {
            username: 'Matt',
            userAvatar: 'https://avatars1.githubusercontent.com/u/30813487?v=4&s=200',
            memberRole: 'Nerd',
            memberSince: 'July 2017'
          },
          {
            username: 'Bobba Boy',
            userAvatar: 'https://avatars1.githubusercontent.com/u/30813487?v=4&s=200',
            memberRole: 'Nerd',
            memberSince: 'July 2017'
          },
          {
            username: 'Ian',
            userAvatar: 'https://avatars1.githubusercontent.com/u/30813487?v=4&s=200',
            memberRole: 'Nerd',
            memberSince: 'July 2017'
          },
          {
            username: 'Karun',
            userAvatar: 'https://avatars1.githubusercontent.com/u/30813487?v=4&s=200',
            memberRole: 'Nerd',
            memberSince: 'July 2017'
          },
          {
            username: 'Tommy',
            userAvatar: 'https://avatars1.githubusercontent.com/u/30813487?v=4&s=200',
            memberRole: 'Nerd',
            memberSince: 'July 2017'
          },
          {
            username: 'Sam',
            userAvatar: 'https://avatars1.githubusercontent.com/u/30813487?v=4&s=200',
            memberRole: 'Nerd',
            memberSince: 'July 2017'
          },
          {
            username: 'Thisisanme withalotof',
            userAvatar: 'https://avatars1.githubusercontent.com/u/30813487?v=4&s=200',
            memberRole: 'Nerd',
            memberSince: 'July 2017'
          },
        ]
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
              component={props => <Home clans={this.props.clans} />} 
            />
            <Route 
              path='/login' 
              component={props => <Login {...props} loginUser={this.props.loginUser}/>}
            />
            <Route 
              path='/logout' 
              component={props => <Logout {...props} logoutUser={this.props.logoutUser}/>}
            />
            <Route 
              path='/register' 
              component={props => <Register {...props} registerUser={this.props.registerUser}/>} 
            />
            <Route
              path='/clan' 
              render={(props) => <ClanRouter {...props} user={this.props.user} clan={this.props.clan}/>}
            />
            <Route
              path='/about' 
              component={About}
            />
            <Route
              path='/users/*' 
              render={(props) => <User 
                user={this.props.user} 
                clans={this.props.user.clans} 
                addNewClan={this.props.addNewClan}
                rerender={this.props.fetchUsersClans}
              />}
            />
            <Route 
              path='/:id' 
              component={props => <ClanRouter user={this.props.user} {...props} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default MainRouter;