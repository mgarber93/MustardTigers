import React from 'react';
import Home from './Home.jsx';
import ClanRouter from './clan/ClanRouter.jsx';
import Login from './auth/Login.jsx';
import Logout from './auth/Logout.jsx';
import Register from './auth/Register.jsx';
import About from './About.jsx';
import { Switch, Route } from 'react-router-dom';
import User from './User.jsx';
import PropTypes from 'prop-types';

/**
 * Class representing the React Main Container Component.
 * @extends Main
 */

class MainRouter extends React.Component {
  constructor (props) {
    super(props);
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

/**
 * All props on MainRouter are optional.
 */
MainRouter.propTypes = {
  user: PropTypes.object,
  clan: PropTypes.array,
  addNewClan: PropTypes.func,
  fetchUsersClans: PropTypes.func,
  rerender: PropTypes.func,
  registerUser: PropTypes.func,
  logoutUser: PropTypes.func,
  loginUser: PropTypes.func,
};

export default MainRouter;