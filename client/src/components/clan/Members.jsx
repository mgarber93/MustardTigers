import React from 'react';
import MemberEntry from './MemberEntry.jsx';
import { Switch, Route } from 'react-router-dom';

/**
 * Class representing the React Members Container Component.
 * @extends Members
 */

class Members extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {

    var members = this.props.members.map((member, i) => {
      return <MemberEntry member={member} key={i} />;
    });

    return (
      <div className='members'>
        {members}
      </div>
    );
  }
}

export default Members;