import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const NavBar = () => (
    <AppBar position="static">
        <Toolbar style={{margin: '0 auto'}}>
            <Typography>
                <Link to="/">Home</Link>
            </Typography>
            <Typography>
            "          "
            </Typography>
            <Typography>
                <Link to="/recipes">Recipes</Link>
            </Typography>
        </Toolbar>
    </AppBar>
);

export default NavBar;