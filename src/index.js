import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './index.css';
import * as serviceWorker from './serviceWorker';
import Homepage from './Pages/Homepage';
import RecipesPage from './Pages/RecipesPage';
import SingleRecipePage from './Pages/SingleRecipePage';
import NavBar from './Components/Layout/Navbar';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { AuthProvider } from './Components/Auth/Auth';
import ProtectedRoute from './Routes/ProtectedRoute';
import DashboardPage from './Pages/DashboardPage';
import AuthRoute from './Routes/AuthRoute';
import ShoppingList from './Pages/ShoppingList';
import { MuiThemeProvider } from '@material-ui/core';
import THEME from './Theme/MuiTheme';
import AboutPage from './Pages/AboutPage';




const routing = (
    <MuiThemeProvider theme={THEME}>
        <AuthProvider>
            <Router>
                <div>
                <NavBar />
                <Route exact path='/' component={Homepage} />
                <Route exact path='/about' component={AboutPage} />
                <Route exact path='/recipes' component={RecipesPage} />
                <Route exact path='/recipes/:id' component={SingleRecipePage} />
                <AuthRoute exact path='/login' component={LoginPage} />
                <AuthRoute exact path='/register' component={RegisterPage} />
                <Route exact path='/shoppinglist' component={ShoppingList} />
                <ProtectedRoute exact path='/dashboard' component={DashboardPage} />
                </div>
            </Router> 
        </AuthProvider>
    </MuiThemeProvider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
