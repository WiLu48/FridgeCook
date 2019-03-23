import React, { Component } from 'react'
import {withStyles, Button, Grid, Avatar, Paper, Typography, FormControl, Input, InputLabel, TextField, InputAdornment} from '@material-ui/core'
import { AuthContext } from '../../Auth/Auth';
import AccountDetailsLocked from './AccountDetailsLocked';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
})

class MyAccountDetails extends Component {
  static contextType = AuthContext;
  render() {
    const {state} = this.context;
    const {classes} = this.props;
    return (
      <Grid container>
        <Grid item xs={12} sm>
          <Paper square className={classes.paper} style={{marginRight: '10px'}}>
            <Typography variant="h5" >
              Update Your Details
            </Typography>
            <AccountDetailsLocked />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper square className={classes.paper}>
            <Typography variant="h5" >
              Your Latests Recipe
            </Typography>
          </Paper>
        </Grid>  
      </Grid>
    )
  }
}

export default withStyles(styles)(MyAccountDetails)
