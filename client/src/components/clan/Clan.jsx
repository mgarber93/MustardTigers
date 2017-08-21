import React, {Component} from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types'; 

import NewClan from './NewClan.jsx';


class Clan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };

    this.divStyle = {
      display: 'inline-block',
      height: '140px',
      width: '140px',
    }; 

    this.deleteClan = this.deleteClan.bind(this);
    this.editClan = this.editClan.bind(this);
    this.addClan = this.addClan.bind(this);
  }

  deleteClan(id, rerender) {
    return axios.delete(`/api/clans/${id}`)
      .then(this.props.rerender);
  }

  editClan() {
    this.setState({editing: !this.state.editing});
  }

  addClan(clan) {
    clan.id = this.props.id;
    return axios.post(`/api/clans/${this.props.id}`, clan)
      .then(this.props.rerender)
      .then(this.editClan);
  }

  render() {
    if (this.state.editing) {
      return (
        <div>
          <NewClan addNewClan={this.addClan}/>
          <Button onClick={() => this.editClan()}>Edit</Button>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img 
              src={this.props.avatar} 
              alt="Clan's avatar picture"
              style={this.divStyle}
            />
            <div className="caption">
              <h3>{this.props.name}</h3>
              <p>{this.props.tag}</p>
              <p>{this.props.description}</p>
              <Button onClick={() => this.editClan()}>Edit</Button>
              <Button onClick={() => this.deleteClan(this.props.id, this.props.rerender)}>Delete</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Clan.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  avatar: PropTypes.string,
  rerender: PropTypes.func,
};

export default Clan;