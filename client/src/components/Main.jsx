import React from 'react'
import Home from './Home.jsx'
import Clan from './clan/ClanWrapper.jsx'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
import { Switch, Route } from 'react-router-dom'

/**
 * Class representing the React Main Container Component.
 * @extends Main
 */

class Main extends React.Component {
  constructor (props) {
    super(props);
  }

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
            component={Login}/>
          <Route 
            path='/register' 
          component={Register} />
          <Route 
            path='/clan' 
            component={Clan} />
        </Switch>
      </main>
      </div>
    );
  }
}

export default Main;