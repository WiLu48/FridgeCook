import React, { Component } from 'react'
import {withStyles, Button, Grid, Avatar, Paper, Typography, FormControl, Input, InputLabel, TextField, InputAdornment} from '@material-ui/core'
import Slider from '@material-ui/lab/Slider'
import { AuthContext } from '../../Auth/Auth';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
})

class AccountDetailsChange extends Component {
  static contextType = AuthContext;
  state = {
    levelName: {
        1: 'Beginner',
        2: 'Intermidiate',
        3: 'Expert'
      },
  }


  render() {
    const {state, handleSlider} = this.context;
    const {classes, fname, lname, change, slide, level} = this.props;
    return (
        <form className={classes.form} >
            <FormControl margin="normal" fullWidth required>
                <TextField
                variant="outlined"
                label="EMAIL"
                value={state.email}
                disabled={true}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
            <TextField
                variant="outlined"
                value={fname}
                label="FIRST NAME"
                name="fname"
                onChange={change}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
            <TextField
                variant="outlined"
                value={lname}
                label="LAST NAME"
                name="lname"
                onChange={change}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth style={{width: '75%', margin: '20px auto', display: 'block'}}>
            <Typography variant="body1" style={{paddingBottom: '15px', textAlign: 'center'}}>Your current level:</Typography>
                <Slider
                    type='range'
                    min={1}
                    max={3}
                    step={1}
                    value={level}
                    aria-labelledby="label"
                    onChange={slide}
                    name="level"
                />
                <Typography style={{paddingTop: '10px', textAlign: 'center'}} variant="body2" id="label">{this.state.levelName[level]}</Typography>
            </FormControl>
        </form>
    )
  }
}

export default withStyles(styles)(AccountDetailsChange)
