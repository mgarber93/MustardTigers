import React from 'react'
import { Switch, Route } from 'react-router-dom'

/**
 * Class representing the React About Container Component.
 * @extends About
 */

class About extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {


    var games = this.props.clan.games.map((game, i) => {
      <Media>
        <Media.Left align="top">
          <img width={64} height={64} src="GAMEIMAGELINKHERE" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>
            <div>{game.title}</div>
          </Media.Heading>
        </Media.Body>
      </Media>
    });

    return (
      <div className='about'> 
        <jumbotron>
          <h3>{this.props.clan.description.head}</h3>
          <div>{this.props.clan.description.body}</div>
        </jumbotron>
        <jumbotron>
          <h3>Games:</h3>
          {games}
        </jumbotron>
      </div>
    )
  }
}

export default About