import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Mobile from './components/Mobile';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, browserHistory } from 'react-router'


const NotFound = () => (
  <div>
    404 Not found
  </div>
)


ReactDOM.render( (
  <Router history={browserHistory}>
    <Route path='/' component={Mobile}/>
    <Route path='/dashboard' component={App}/>
    <Route path='*' component={NotFound}/>
</Router> ),
  document.getElementById('root')
);
registerServiceWorker();
