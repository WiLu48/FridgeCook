import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth'
import { Grid } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  padding: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    borderRadius: 0,
  },
});

class RegisterForm extends Component {
  static contextType = AuthContext;
  state = {
    levelName: {
      1: 'Beginner',
      2: 'Intermidiate',
      3: 'Expert'
    },
  }

  componentDidMount(){
    this.context.updateState('level', 1, 'level');
  }

  
  render(){
    const { classes } = this.props;
    const {handleChange, register, handleSlider, state} = this.context;
    const {level, responsiveImage, levelSelected} = this.state;
    
    return (
      <main className={classes.main}>
        <Paper square className={classes.paper}>
          <Grid container>
            <Grid item sm={12} md={6}>
              {levelSelected ? 
              <img alt="skill level" style={{width: '100%', height: '100%'}} src={"Assets/" + state.level + ".jpg"} />
              :
              <img alt="skill level" style={{width: '100%', height: '100%'}} src={"Assets/0.jpg"} />
              }
            </Grid>
            <Grid item sm={12} md={6} >
              <div className={classes.padding}>
              <form className={classes.form} onSubmit={(e) => register(e)}>
              <Typography style={{fontWeight: 'bold', textDecoration: 'underline'}} component="h1" variant="h5">
                Join Our Community
              </Typography>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <FormControl margin="normal" required style={{width: '48%'}}>
                  <InputLabel htmlFor="text">First Name</InputLabel>
                  <Input onChange={handleChange} id="firstname" name="firstname"/>
                </FormControl>
                <FormControl margin="normal" required style={{width: '48%'}}>
                <InputLabel htmlFor="text">Surname</InputLabel>
                <Input variant onChange={handleChange} id="lastname" name="lastname"/>
              </FormControl>
              </div>
              <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input onChange={handleChange} id="email" name="email" />
              </FormControl>
              <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input onChange={handleChange} name="password" type="password" id="password" />
              </FormControl>
              <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <Input onChange={handleChange} name="password2" type="password" id="password2" />
              </FormControl>
              <FormControl margin="normal" fullWidth >
              <Typography variant="body1" style={{paddingBottom: '15px', textAlign: 'center'}}>Choose your cooking level:</Typography>
                <Slider
                      type='range'
                      min={1}
                      max={3}
                      step={1}
                      value={state.level}
                      aria-labelledby="label"
                      onChange={handleSlider}
                      onMouseOver={() => this.setState({levelSelected: true})}
                      name="level"
                      style={{width: '70%', margin: '0 auto'}}
                  />
                <Typography style={{paddingTop: '10px', textAlign: 'center'}} variant="body2" id="label">{this.state.levelName[state.level]}</Typography> 
              </FormControl>
              <Button
                type="submit"
                style={{display: 'none'}}
              />   
            </form>
            </div>
            <Button
              square={true}
              type="submit"
              onClick={(e) => register(e)}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            </Grid>
          </Grid>
        </Paper> 
      </main>
    );
  }
}


RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterForm);