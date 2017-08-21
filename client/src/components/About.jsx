import React, {Component} from 'react';
import {Jumbotron, Button, Image} from 'react-bootstrap';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      c: 0
    };
    this.h = this.h.bind(this);
  }
  
  h() {
    this.setState({c: ++this.state.c});
  }

  render () {
    return (
      <div className="container">
        <Jumbotron>
          <h2>Heading</h2>
          <p>Welcome message</p>
          <p><Button bsStyle="primary" onClick={this.h}>Click Me</Button></p>
          <img width="128" src='http://blisstree-2012-stage.com/files/2013/04/70930_100000101084323_6420104_n.jpg'/>
          Matt Garber - Brett Kirk - Talis Lazdins - Ian Mobley
        </Jumbotron>
        {this.state.c > 5 && <iframe width="560" height="315" src="https://www.youtube.com/embed/lDFt3ZLZ8NI" frameborder="0" allowfullscreen></iframe>}
      </div>
    );
  }
}

export default About;