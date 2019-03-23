import React, { Component } from 'react'
import {withStyles, Button, Grid, Avatar, Paper, Typography, FormControl, Input, InputLabel, TextField, InputAdornment} from '@material-ui/core'
import {Slider} from '@material-ui/lab'
import { AuthContext } from '../../Auth/Auth';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
})

class MyAccountDetails extends Component {
  static contextType = AuthContext;
  state = {
    levelName: {
        1: 'Beginner',
        2: 'Intermidiate',
        3: 'Expert'
      },
  }
  render() {
    const {state} = this.context;
    const {classes} = this.props;
    return (
        <form className={classes.form} >
            <FormControl margin="normal" fullWidth>
                <TextField
                variant="outlined"
                label="EMAIL"
                value={state.email}
                disabled={true}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth>
            <TextField
                variant="outlined"
                value={state.firstname}
                label="FIRST NAME"
                disabled={true}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth>
            <TextField
                variant="outlined"
                value={state.lastname}
                disabled={true}
                label="LAST NAME"
                />
            </FormControl>
            <FormControl margin="normal" fullWidth style={{width: '75%', margin: '20px auto', display: 'block'}}>
            <Typography variant="p1" style={{paddingBottom: '15px', textAlign: 'center'}}>Your current level:</Typography>
                <Slider
                    type='range'
                    min='1'
                    max='3'
                    value={state.level}
                    aria-labelledby="label"
                />
                <Typography style={{paddingTop: '10px', textAlign: 'center'}} variant="body1" id="label">{this.state.levelName[state.level]}</Typography>
            </FormControl>
        </form>
    )
  }
}

export default withStyles(styles)(MyAccountDetails)
