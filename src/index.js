import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Homepage from './Pages/Homepage';
import Recipes from './Pages/Recipes';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
        <Route exact path='/' component={Homepage} />
        <Route path='/recipes' component={Recipes} />
        </div>
    </Router> 
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
