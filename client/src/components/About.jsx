import React from 'react';
import {Jumbotron, Button, Image} from 'react-bootstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="container">
        <Jumbotron>
          <h2>Heading</h2>
          <p>Welcome message</p>
          <p><Button bsStyle="primary">Click Me</Button></p>
          <img width="128" src='http://blisstree-2012-stage.com/files/2013/04/70930_100000101084323_6420104_n.jpg'/>
          Matt Garber - Brett Kirk - Talis Lazdins - Ian Mobley
        </Jumbotron>
      </div>
    );
  }
}

export default Home;