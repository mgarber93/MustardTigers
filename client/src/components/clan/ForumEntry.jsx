import React from 'react'
import { Switch, Route } from 'react-router-dom'

/**
 * Class representing the React ForumEntry Container Component.
 * @extends ForumEntry
 */

class ForumEntry extends React.Component {
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

export default ForumEntry