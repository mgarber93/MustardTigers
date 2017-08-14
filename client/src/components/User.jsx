import React, {Component} from 'react';
import NewClan from './clan/NewClan.jsx';

const User = (props) => (
  <section>
    <h5 className="user-name">welcome {props.user.username}</h5>
    <h5>TODO: list of clans joined</h5>
    <h5>TODO: join an existing clan</h5>
    <NewClan addNewClan={props.addNewClan}/>
  </section>
);

export default User;