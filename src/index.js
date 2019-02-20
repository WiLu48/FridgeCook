import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './index.css';
import * as serviceWorker from './serviceWorker';
import Homepage from './Pages/Homepage';
import RecipesPage from './Pages/RecipesPage';
import SingleRecipePage from './Pages/SingleRecipePage';
import NavBar from './Components/Layout/Navbar';

const routing = (
    <Router>
        <div>
        <NavBar />
        <Route exact path='/' component={Homepage} />
        <Route exact path='/recipes' component={RecipesPage} />
        <Route exact path='/recipes/:id' component={SingleRecipePage} />
        </div>
    </Router> 
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
