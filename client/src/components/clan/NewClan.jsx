import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
/**
 * Class representing the React Create Clan Component.
 * @extends CreateClan
 */
 
class NewClan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clan: {
        name: '',
        tage: '',
        avatar: '',
        description: ''
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      clan: Object.assign(this.state.clan, {[e.target.id]: e.target.value})
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addNewClan(this.state.clan);
  }

  render () {
    return (
      <Grid>
        <Row>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} sm={2}>Clan Name</Col>
              <Col sm={4}>
                <FormControl 
                  type="text" 
                  placeholder="Mustard Tigers" 
                  value={this.state.clan.name} 
                  onChange={this.handleChange} 
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="tag">
              <Col componentClass={ControlLabel} sm={2}>Clan Tag</Col>
              <Col sm={4}>
                <FormControl 
                  type="text" 
                  placeholder="MST" 
                  value={this.state.clan.tag} 
                  onChange={this.handleChange} 
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="avatar">
              <Col componentClass={ControlLabel} sm={2}>Clan Avatar</Col>
              <Col sm={4}>
                <FormControl 
                  type="text" 
                  placeholder="http://google.com/myclan.png" 
                  value={this.state.clanAvatar} 
                  onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="description">
              <Col componentClass={ControlLabel} sm={2}>Description</Col>
              <Col sm={4}>
                <FormControl 
                  type="text" 
                  placeholder="" 
                  value={this.state.description} 
                  onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={1}>
                <ButtonToolbar>
                  <Button type="submit" bsStyle="success">Add Clan</Button>
                  <Button href="/" bsStyle="danger">Cancel</Button>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Grid>
    );
  }
}
export default NewClan;