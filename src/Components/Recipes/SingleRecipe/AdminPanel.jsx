import React, { Component } from 'react'
import { Paper, withStyles, Typography, Button, Grid } from '@material-ui/core';

const styles = theme => ({
    paper: {
      width: '50%',
      margin: '0 auto',
      marginTop: '30px',
      background: 'lightgrey'
    },
    paperWrapper: {
        padding: theme.spacing.unit,
    },
    paperAccent: {
        display: 'block',
        width: '100%',
        height: '5px',
        background: 'lightcoral'
    },
  });
  

class AdminPanel extends Component {
    state = {
        message: "this is a test message"
    }
  render() {
      const { classes } = this.props;
    return (
      <Paper square className={classes.paper}>
        <span className={classes.paperAccent} />
        <div className={classes.paperWrapper}>
          <Grid container>
            <Grid item xs>
              <Typography variant="h5" style={{textAlign: 'center'}}>
                  Admin Panel  
              </Typography>
              <Typography variant="h6">
                Current Status: ONLINE
              </Typography>
            </Grid>
            <Grid item xs>
              <Button style={{display: 'block'}} variant="contained">Make Private</Button>
              <Button style={{display: 'block'}} variant="contained">Edit Recipe</Button>
              <Button style={{display: 'block'}} variant="contained">Remove Recipe</Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(AdminPanel);
