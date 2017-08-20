import React from 'react';
import axios from 'axios';
import {Jumbotron, Button, Image, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

/**
 * Home view
 * @todo If user is logged in, stich togeather forums/ show notifications.
 */
export default (props) => (
  <div className="container">
    <Table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Tag</th>
          <th>Description</th>
          <th>Join</th>
        </tr>
      </thead>
      <tbody>
        {props.clans.map(clan => (
          <tr key={clan.id}>
            <th scope="row">{clan.id}</th>
            <td>{clan.name}</td>
            <td>{clan.tag}</td>
            <td>{clan.description}</td>
            <td>
              <LinkContainer to={`/${clan.id}`}>
                <Button bsStyle="primary">Go</Button>
              </LinkContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

