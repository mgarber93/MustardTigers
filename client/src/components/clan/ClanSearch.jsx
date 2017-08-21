import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import ClanSearchEntry from './ClanSearchEntry.jsx';

/**
 * Search form and controllers.
 */
class ClanSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clanTagSearch: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clanSearch(this.state.clanTagSearch);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="clanTagSearch">
              <Col componentClass={ControlLabel} sm={2}>Search by Clan Tag: </Col>
              <Col sm={4}>
                <InputGroup>
                  <FormControl type="text" placeholder="Mustard Tigers" value={this.state.clanTagSearch} onChange={this.handleChange} />
                  <InputGroup.Button>
                    <Button type="submit"><Glyphicon glyph="search" /></Button>
                  </InputGroup.Button>
                </InputGroup>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Grid>
    );
  }
}

ClanSearch.propTypes = {
  clanSearch: PropTypes.func,
};

export default ClanSearch;