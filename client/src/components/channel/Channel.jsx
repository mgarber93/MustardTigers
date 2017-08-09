import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChannelList from './ChannelList.jsx';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    console.log('This props', props);
  }

  render() {
    return (
      <Switch>
        <Route 
          exact path='/channel' 
          render={(props) => <ChannelList {...props} messages={this.props.messages}/>}
        />
      </Switch>
    );
  }
}

export default Channel;
