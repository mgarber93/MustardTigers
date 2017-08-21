import React from 'react';
import axios from 'axios';

// React Router Components
import { LinkContainer } from 'react-router-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';

// React Components
import About from './About.jsx';
import Events from './Events.jsx';
import NewClan from './NewClan.jsx';
import Members from './Members.jsx';
import ClanSearch from './ClanSearch.jsx';
import ForumRouter from './forums/ForumRouter.jsx';

// React Bootstrap Components
import { Nav, NavItem } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { ButtonGroup, Button, Jumbotron } from 'react-bootstrap';

/**
 * Class representing the React Clan Container Component.
 * @extends Clan
 */

class ClanRouter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      clan: this.props.user.clans.filter(c => Number(c.id) === Number(this.props.match.params.id))[0] || {},
      forums: []
    };
  }

  clanSearch(clan) {
    console.log('Searching Clan', clan);
    // TODO: post to database
    axios.get('')
      .then((clans) => {
        console.log('Client: Success! Searching Clans', clans);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createNewForum (forum) {
    forum.clanId = this.state.clan.id;
    console.log('(Client) Adding New Forum', forum);
    return axios.post('/api/forums', forum)
      .then((forum) => {
        console.log('(Client) Success! Adding New forum', forum);
        this.fetchForums();
        this.props.history.push(`/${this.props.clan.id}/forums`);
      })
      .catch((err) => {
        console.log('(Client) Error! Adding New Forum', err);
      });
  }


  fetchForums() {
    axios.get('/api/forums')
      .then((res) => {
        let forums = res.data.results;
        console.log('Client: Success! Getting forums', forums);
        this.setState({
          forums: forums
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createNewForumPost (post) {
    console.log('Adding new Post', post);
    let forumId = post.forumId;
    return axios.post(`/api/forums/${forumId}/posts`, post)
      .then((post) => {
        console.log('(Client) Success! Adding New post', post);
        this.fetchPosts(forumId);
      })
      .catch((err) => {
        console.log('(Client) Error! Adding New Post', err);
      });
  }

  fetchPosts(forumId) {
    axios.get(`/api/forums/${forumId}/posts`)
      .then((res) => {
        let posts = res.data;
        console.log('Client: Success! Getting Posts', posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  formatDate(date) {
    let d = new Date(date);
    let locale = 'en-us';
    let month = d.toLocaleString(locale, { month: 'short' });
    return month + ' ' + d.getFullYear();
  }

  componentWillMount() {
    this.fetchForums();
    //this.fetchPosts(1);
  }

  render() {
    return (
      <div className='wrapper'>
        <Jumbotron>
          <Grid>
            <Row className="show-grid">
              <Col sm={2}>
                <img width={128} height={128} src={this.state.clan.avatar} />
              </Col>
              <Col sm={10}>
                <Link to={`/${this.state.clan.id}`}>
                  <h2 className="user-name">{this.state.clan.name} ({this.state.clan.tag})</h2>
                </Link>
                <div><i>Founded: {this.formatDate(this.state.clan.createdAt)}</i></div>
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
        <main>
          <div className="container">
            <Nav bsStyle="tabs" activeKey={1}>
              <LinkContainer to={`/${this.state.id}/about`}>
                <NavItem eventKey={1}>About</NavItem>
              </LinkContainer>
              <LinkContainer to={`/${this.state.id}/forums`}>
                <NavItem eventKey={2}>Forums</NavItem>
              </LinkContainer>
              <LinkContainer to={`/${this.state.id}/events`}>
                <NavItem eventKey={3}>Events</NavItem>
              </LinkContainer>
              <LinkContainer to={`/${this.state.id}/members`}>
                <NavItem eventKey={4}>Members</NavItem>
              </LinkContainer>
            </Nav>
          </div>
          <Switch>
            <Route 
              exact path={`/${this.state.id}/about`}
              render={(props) => <About {...props} clan={this.state.clan}/>}
            />
            <Route
              path={`/${this.state.id}/forums`}
              render={(props) => <ForumRouter {...props} user={this.props.user} clan={this.state.clan} forums={this.state.forums} createNewForum={this.createNewForum.bind(this)} createNewForumPost={this.createNewForumPost.bind(this)} />}
            />
            <Route
              exact path={`/${this.state.id}/members`}
              render={(props) => <Members {...props} clan={this.state.clan}/>}
            />
            <Route
              exact path={`/${this.state.id}/events`}
              render={(props) => <Members {...props} clan={this.state.clan}/>}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default ClanRouter;