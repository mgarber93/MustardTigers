const express = require('express');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser'); 
const User = require('../database/models/user');
const session = require('express-session');
const Store = require('connect-session-sequelize')(session.Store);
const { db } = require('../database/connection');
const app = express();

/**
 * Create the mySql store; passing in the database connection
 */
const store = new Store({
  db: db
});

store.sync();


const usersRouter = require('./users');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Creates a new session
 */
app.use(session({
  name: 'MustardTigers',
  secret: '5 dollar gold club special',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: store
}));

/**
 * Static routes
 */
app.use(express.static(__dirname + '/../client/dist'));

app.use('/users', usersRouter);



module.exports.app = app;