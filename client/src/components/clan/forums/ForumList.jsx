// Libraries
import React from 'react';

// React Components
import ForumListEntry from './ForumListEntry.jsx';

// React Router Components
import {LinkContainer} from 'react-router-bootstrap';

// React Bootstrap Components
import { Grid, Row, Col, ListGroup, Table, Button } from 'react-bootstrap';

/**
 * Class representing the React Forums Container Component.
 * @extends Forums
 */

class ForumList extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    // TODO: update where the data is coming right, changing it to state
    //       for now to allow for testing.
    var forums = this.props.forums.map((forum, i) => {
      return <ForumListEntry clan={this.props.clan} forum={forum} key={i} />;
    });
    if (forums) {
      return (
        <div>
          <Grid>
            <Row>
              <div className="pull-right">
                <LinkContainer to={`/${this.props.clan.id}/forums/new`}>
                  <Button bsStyle="success">
                    Add New Forum
                  </Button>
                </LinkContainer>
              </div>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th colSpan="2">Clan Forums</th>
                    <th>Threads</th>
                    <th>Posts</th>
                  </tr>
                </thead>
                <tbody>
                  {forums}
                </tbody>
              </Table>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <Grid>
            <Row>
              <div className="pull-right">
                <LinkContainer to={`/${this.props.clan.id}/forums/new`}>
                  <Button bsStyle="success">
                    Add New Forum
                  </Button>
                </LinkContainer>
              </div>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th colSpan="2">Clan Forums</th>
                    <th>Threads</th>
                    <th>Posts</th>
                  </tr>
                </thead>
                <tbody>
                  This clan does not have any forums. Please create one.
                </tbody>
              </Table>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default ForumList;