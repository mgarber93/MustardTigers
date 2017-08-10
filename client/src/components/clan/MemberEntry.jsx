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
      <div className='member'>
        <Media>
          <Media.Left align="top">
            <img width={64} height={64} src={this.props.user.picture} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <div>{this.props.user.username} </div>
            </Media.Heading>
          </Media.Body>
        </Media>
      </div>
    )
  }
}

export default MemberEntry