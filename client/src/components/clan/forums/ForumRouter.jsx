// Libraries
import React from 'react';
import axios from 'axios';

// React Router Components
import { Switch, Route } from 'react-router-dom';

// React Components
import Post from './Post.jsx';
import Forum from './Forum.jsx';
import ForumList from './ForumList.jsx';
import NewForum from './NewForum.jsx';
import NewForumPost from './NewForumPost.jsx';
import NewPostComment from './NewPostComment.jsx';

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
      posts: []
    };
  }

  // updateForums(forums) {
  //   this.setState({
  //     forums: forums
  //   });
  // }

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

  fetchPosts(forumId) {
    axios.get(`/api/forums/${forumId}/posts`)
      .then((res) => {
        let posts = res.data;
        console.log('Client: Success! Getting Posts', posts);
        this.setState({
          posts: posts
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    return (
      <div>
        <Switch>
          {/* Forum List Route /clan/forums */}
          <Route
            exact path={`/${this.props.clan.id}/forums`}
            render={(props) => <ForumList {...props} clan={this.props.clan} forums={this.props.forums}/>}
          />
          {/* NewForum Route /clan/forums/new */}
          <Route
            path={`/${this.props.clan.id}/forums/new`}
            render={(props) => <NewForum {...props} clan={this.props.clan} user={this.props.user} createNewForum={this.props.createNewForum}/>}
          />
          {/* NewForumPost Route /clan/forums/forumid/new */}
          <Route
            exact path={`/${this.props.clan.id}/forums/:id/new`}
            render={(props) => <NewForumPost {...props} clan={this.props.clan} user={this.props.user} createNewForumPost={this.props.createNewForumPost}/>}
          />
          {/* Forum Route /clan/forums/forumid */}
          <Route
            exact path={`/${this.props.clan.id}/forums/:id`}
            render={(props) => <Forum {...props} clan={this.props.clan} posts={this.state.posts} forums={this.props.forums} fetchPosts={this.fetchPosts.bind(this)}/>}
          />
          {/* NewPostComment Route /clan/forums/forumid/postid */}
          <Route 
            exact path={`/${this.props.clan.id}/forums/:id/:id`}
            render={(props) => <Post {...props} clan={this.props.clan} posts={this.state.posts} forums={this.props.forums} fetchPosts={this.fetchPosts.bind(this)}/>}
          />
          {/* NewPostComment Route /clan/forums/forumid/new */}
          <Route
            exact path={`/${this.props.clan.id}/forums/:id/:id/new`}
            render={(props) => <NewPostComment {...props} clan={this.props.clan} user={this.props.user} createNewPostComment={this.createNewPostComment.bind(this)}/>}
          />
        </Switch>
      </div>
    );
  }
}

export default ForumRouter;


// forums: [
//   {
//     id: '1',
//     name: 'First Forum',
//     avatar: 'th-list',
//     description: 'The first Forum',
//     posts: [
//       {
//         id: '0',
//         author: 'TNauda',
//         createdAt: ' 2017-08-19 17:49:55',
//         title: 'First post',
//         body: 'This is the body of a post. It is very interesting. I love starcraft, ',
//         comments: [
//           {
//             id: '0',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the first comment'
//           },
//           {
//             id: '1',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the second comment'
//           },
//           {
//             id: '3',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the third comment'
//           },
//         ]
//       },
//       {
//         id: '1',
//         author: 'TNauda',
//         createdAt: ' 2017-08-19 17:49:55',
//         title: 'Second post',
//         body: 'This is the body of a post. It is very interesting. I love starcraft',
//         comments: [
//           {
//             id: '0',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the first comment'
//           },
//           {
//             id: '1',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the second comment'
//           },
//           {
//             id: '3',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the third comment'
//           },
//         ]
//       },
//       {
//         id: '2',
//         author: 'TNauda',
//         createdAt: ' 2017-08-19 17:49:55',
//         title: 'Third post',
//         body: 'This is the body of a post. It is very interesting. I love starcraft',
//         comments: [
//           {
//             id: '0',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the first comment'
//           },
//           {
//             id: '1',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the second comment'
//           },
//           {
//             id: '3',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the third comment'
//           },
//         ]
//       },
//       {
//         id: '3',
//         author: 'TNauda',
//         createdAt: ' 2017-08-19 17:49:55',
//         title: 'Fourth post',
//         body: 'This is the body of a post. It is very interesting. I love starcraft',
//         comments: [
//           {
//             id: '0',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the first comment'
//           },
//           {
//             id: '1',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the second comment'
//           },
//           {
//             id: '3',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the third comment'
//           },
//         ]
//       },
//     ]
//   },
//   {
//     id: '2',
//     name: 'Second Forum',
//     avatar: 'th-list',
//     description: 'The Second Forum',
//     posts: [
//       {
//         id: '0',
//         author: 'TNauda',
//         createdAt: ' 2017-08-19 17:49:55',
//         title: 'First post',
//         body: 'This is the body of a post. It is very interesting. I love starcraft, ',
//         comments: [
//           {
//             id: '0',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the first comment'
//           },
//           {
//             id: '1',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the second comment'
//           },
//           {
//             id: '3',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the third comment'
//           },
//         ]
//       },
//       {
//         id: '1',
//         author: 'TNauda',
//         createdAt: ' 2017-08-19 17:49:55',
//         title: 'Second post',
//         body: 'This is the body of a post. It is very interesting. I love starcraft',
//         comments: [
//           {
//             id: '0',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the first comment'
//           },
//           {
//             id: '1',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the second comment'
//           },
//           {
//             id: '3',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the third comment'
//           },
//         ]
//       },
//       {
//         id: '2',
//         author: 'TNauda',
//         createdAt: ' 2017-08-19 17:49:55',
//         title: 'Third post',
//         body: 'This is the body of a post. It is very interesting. I love starcraft',
//         comments: [
//           {
//             id: '0',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the first comment'
//           },
//           {
//             id: '1',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the second comment'
//           },
//           {
//             id: '3',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the third comment'
//           },
//         ]
//       },
//       {
//         id: '3',
//         author: 'TNauda',
//         createdAt: ' 2017-08-19 17:49:55',
//         title: 'Fourth post',
//         body: 'This is the body of a post. It is very interesting. I love starcraft',
//         comments: [
//           {
//             id: '0',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the first comment'
//           },
//           {
//             id: '1',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the second comment'
//           },
//           {
//             id: '3',
//             createdAt: ' 2017-08-19 17:49:55',
//             author: 'TNauda',
//             body: 'This is the third comment'
//           },
//         ]
//       },
//     ]
//   },
// ]