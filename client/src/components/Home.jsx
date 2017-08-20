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
          <h2>Clans: {this.props.clans.length}</h2>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;