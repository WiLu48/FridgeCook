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

class AccountChangePassword extends Component {
  static contextType = AuthContext;
  state = {

  }
  render() {
    const {state, handleChange} = this.context;
    const {classes} = this.props;
    return (
        <form className={classes.form} >
            <FormControl margin="normal" fullWidth required>
                <TextField
                variant="outlined"
                label="Current Password"
                type="password"
                name="oldpassword"
                value={state.oldpassword}
                onChange={handleChange}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
                <TextField
                variant="outlined"
                label="New Password"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
                <TextField
                variant="outlined"
                label="Confirm New Password"
                type="password"
                name="password2"
                value={state.password2}
                onChange={handleChange}
                />
            </FormControl>
        </form>
    )
  }
}

export default withStyles(styles)(AccountChangePassword)
