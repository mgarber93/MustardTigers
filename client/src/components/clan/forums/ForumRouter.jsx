import React from 'react';
import axios from 'axios';

// React Componenets
import Post from './Post.jsx';
import Forum from './Forum.jsx';
import ForumList from './ForumList.jsx';
import NewForum from './NewForum.jsx';
import NewForumPost from './NewForumPost.jsx';
import NewPostComment from './NewPostComment.jsx';

// React Router Components
import { Switch, Route } from 'react-router-dom';

//React Bootstrap Components
import { Grid, Row, Col, ListGroup, Table } from 'react-bootstrap';

/**
 * Class representing the React ForumRouter Container Component.
 * @extends ForumRouter
 */

class ForumRouter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentForum: {},
      forums: [
        {
          id: '1',
          name: 'First Forum',
          avatar: 'th-list',
          description: 'The first Forum',
          posts: [
            {
              id: '0',
              author: 'TNauda',
              createdAt: ' 2017-08-19 17:49:55',
              title: 'First post',
              body: 'This is the body of a post. It is very interesting. I love starcraft, ',
              comments: [
                {
                  id: '0',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the first comment'
                },
                {
                  id: '1',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the second comment'
                },
                {
                  id: '3',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the third comment'
                },
              ]
            },
            {
              id: '1',
              author: 'TNauda',
              createdAt: ' 2017-08-19 17:49:55',
              title: 'Second post',
              body: 'This is the body of a post. It is very interesting. I love starcraft',
              comments: [
                {
                  id: '0',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the first comment'
                },
                {
                  id: '1',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the second comment'
                },
                {
                  id: '3',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the third comment'
                },
              ]
            },
            {
              id: '2',
              author: 'TNauda',
              createdAt: ' 2017-08-19 17:49:55',
              title: 'Third post',
              body: 'This is the body of a post. It is very interesting. I love starcraft',
              comments: [
                {
                  id: '0',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the first comment'
                },
                {
                  id: '1',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the second comment'
                },
                {
                  id: '3',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the third comment'
                },
              ]
            },
            {
              id: '3',
              author: 'TNauda',
              createdAt: ' 2017-08-19 17:49:55',
              title: 'Fourth post',
              body: 'This is the body of a post. It is very interesting. I love starcraft',
              comments: [
                {
                  id: '0',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the first comment'
                },
                {
                  id: '1',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the second comment'
                },
                {
                  id: '3',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the third comment'
                },
              ]
            },
          ]
        },
        {
          id: '2',
          name: 'Second Forum',
          avatar: 'th-list',
          description: 'The Second Forum',
          posts: [
            {
              id: '0',
              author: 'TNauda',
              createdAt: ' 2017-08-19 17:49:55',
              title: 'First post',
              body: 'This is the body of a post. It is very interesting. I love starcraft, ',
              comments: [
                {
                  id: '0',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the first comment'
                },
                {
                  id: '1',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the second comment'
                },
                {
                  id: '3',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the third comment'
                },
              ]
            },
            {
              id: '1',
              author: 'TNauda',
              createdAt: ' 2017-08-19 17:49:55',
              title: 'Second post',
              body: 'This is the body of a post. It is very interesting. I love starcraft',
              comments: [
                {
                  id: '0',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the first comment'
                },
                {
                  id: '1',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the second comment'
                },
                {
                  id: '3',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the third comment'
                },
              ]
            },
            {
              id: '2',
              author: 'TNauda',
              createdAt: ' 2017-08-19 17:49:55',
              title: 'Third post',
              body: 'This is the body of a post. It is very interesting. I love starcraft',
              comments: [
                {
                  id: '0',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the first comment'
                },
                {
                  id: '1',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the second comment'
                },
                {
                  id: '3',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the third comment'
                },
              ]
            },
            {
              id: '3',
              author: 'TNauda',
              createdAt: ' 2017-08-19 17:49:55',
              title: 'Fourth post',
              body: 'This is the body of a post. It is very interesting. I love starcraft',
              comments: [
                {
                  id: '0',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the first comment'
                },
                {
                  id: '1',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the second comment'
                },
                {
                  id: '3',
                  createdAt: ' 2017-08-19 17:49:55',
                  author: 'TNauda',
                  body: 'This is the third comment'
                },
              ]
            },
          ]
        },
      ]
    };
  }

  updateCurrentForum(forum) {
    this.setState({
      currentForum: forum
    });
  }

  updateForums(forums) {
    this.setState({
      forums: forums
    });
  }

  createNewForum (forum) {
    // TODO: Post request for new Forum
    console.log('Adding new Post', forum);
    axios.post('/forum', forum)
      .then((forum) => {
        console.log('(Client) Success! Adding New forum', forum);
        this.fetchForums();
      })
      .catch((err) => {
        console.log('(Client) Error! Adding New Forum', err);
      });
    this.props.history.push('/clan/forums');
  }

  createNewForumPost (post) {
    console.log('Adding new Post', post);
    axios.post('/post', post)
      .then((post) => {
        console.log('(Client) Success! Adding New post', post);
        this.fetchForums();
      })
      .catch((err) => {
        console.log('(Client) Error! Adding New Post', err);
      });
    this.props.history.push(`/clan/forums/${this.state.currentForum.name}`);
  }

  createNewPostComment (comment, postID) {
    console.log('Adding new comment', comment);
    axios.post('/comment', comment)
      .then((comment) => {
        console.log('(Client) Success! Adding New comment', comment);
        this.fetchForums();
      })
      .catch((err) => {
        console.log('(Client) Error! Adding New comment', err);
      });
    this.props.history.push(`/clan/forums/${this.state.currentForum.name}/${postID}`);
  }

  fetchForums() {
    axios.get('/forums')
      .then((clans) => {
        console.log('Client: Success! Getting forums', forums);
        this.updateForums(forums);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillMount () {
    //this.fetchForums();
  }

  render() {

    return (
      <div>
        <Switch>
          <Route
            exact path='/clan/forums'
            render={(props) => <ForumList {...props} clan={this.props.clan} forums={this.state.forums}/>}
          />
          <Route
            exact path='/clan/forums/new'
            render={(props) => <NewForum {...props} clan={this.props.clan} createNewForum={this.createNewForum.bind(this)}/>}
          />
          <Route
            path='/clan/forums/:name/new'
            render={(props) => <NewForumPost {...props} clan={this.props.clan} createNewForumPost={this.createNewForumPost.bind(this)}/>}
          />
          <Route 
            path='/clan/forums/:name/:id/new'
            render={(props) => <NewPostComment {...props} clan={this.props.clan} createNewPostComment={this.createNewPostComment.bind(this)}/>}
          />
          <Route 
            path='/clan/forums/:name/:id'
            render={(props) => <Post {...props} clan={this.props.clan} forum={this.state.currentForum}/>}
          />
          <Route 
            exact path='/clan/forums/:name'
            render={(props) => <Forum {...props} clan={this.props.clan} updateForum={this.updateCurrentForum.bind(this)} forums={this.state.forums}/>}
          />
        </Switch>
      </div>
    );
  }
}

export default ForumRouter;