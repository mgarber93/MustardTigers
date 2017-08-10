import React from 'react'
import MemberEntry from './MemberEntry.jsx'
import { Switch, Route } from 'react-router-dom'

/**
 * Class representing the React MemberEntry Container Component.
 * @extends MemberEntry
 */

class MemberEntry extends React.Component {
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
            exact path='/channel' 
            component={Channel} 
          />
          <Route component={Login}/>
          <Route component={Register} />
        </Switch>
      </main>
      </div>
    )
  }
}

export default MemberEntry