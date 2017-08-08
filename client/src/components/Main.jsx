import React from 'react'
import Home from './Home.jsx'
import Login from './Login.jsx'
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
            render={(props) => <Login {...props} registerNewUser={this.props.registerNewUser}/>}
          />
        </Switch>
      </main>
      </div>
    )
  }
}

export default Main