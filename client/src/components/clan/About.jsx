import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Jumbotron, Media } from 'react-bootstrap';

/**
 * Class representing the React About Container Component.
 * @extends About
 */
class About extends React.Component {

  render() {
    return (
      <div className='about'> 
        <Jumbotron>
          <div>{this.props.clan.description}</div>
        </Jumbotron>
        <Jumbotron>
          <h3>Games:</h3>
          <Media>
            <Media.Left align="top">
              <img width={64} height={64} src="http://www.icons101.com/icons/72/5_Simple_Games_by_Paul_Schulerr/128/Starcraft-2.png" />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <div>StarCraft II</div>
              </Media.Heading>
            </Media.Body>
          </Media>
        </Jumbotron>
      </div>
    );
  }
}

About.propTypes = {
  clan: PropTypes.object,
};

export default About;
