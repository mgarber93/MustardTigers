import axios from 'axios';
import React from 'react';

/**
 * Class representing the React Logout Component.
 * @extends Logout
 */
 
class Logout extends React.Component {

  componentDidMount() {
    console.log('Logging Out');
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render () {
    return (
      <div className="container">
        <h2>Logging out...</h2>
      </div>
    );
  }
}
export default Logout;