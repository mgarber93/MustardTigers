import React from 'react';
import {Jumbotron, Button, Image, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Tag</th>
              <th>Description</th>
              <th>Go</th>
            </tr>
          </thead>
          <tbody>
            {this.props.clans.map(clan => (
              <tr key={clan.id}>
                <th scope="row">{clan.id}</th>
                <td>{clan.name}</td>
                <td>{clan.tag}</td>
                <td>{clan.description}</td>
                <td>
                  <LinkContainer to={`/${clan.id}`}>
                    <Button>Go</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Home;