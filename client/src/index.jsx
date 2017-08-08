import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {BrowserRouter as Router} from 'react-router-dom'

/** Render App using React Router. */
ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'));