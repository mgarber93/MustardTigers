import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import ClanSearchEntry from './ClanSearchEntry.jsx';

class ClanSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clanTagSearch: '',
    }
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

    // let searchResults = this.props.clan.map((clan, i) => {
    //   return <ClanSearchEntry clan={clan} key={i} />
    // });

    return (
      <Grid>
        <Row>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="clanTagSearch">
              <Col componentClass={ControlLabel} sm={2}>Search by Clan Tag: </Col>
              <Col sm={4}>
                <InputGroup>
                  <FormControl type="text" placeholder="Mustard Tigers" value={this.state.clanTagSearch} onChange={this.handleChange.bind(this)} />
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

export default ClanSearch;