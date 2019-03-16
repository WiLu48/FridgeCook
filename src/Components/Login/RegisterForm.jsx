import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
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

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class RegisterForm extends Component {
  static contextType = AuthContext;
  
  render(){
    const { classes } = this.props;
    const {handleChange, register} = this.context;
    
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>        
          <form className={classes.form} onSubmit={(e) => register(e)}>
              <FormControl margin="normal" fullWidth required>
                  <InputLabel htmlFor="text">First Name</InputLabel>
                  <Input onChange={handleChange} id="firstname" name="firstname"/>
              </FormControl>
              <FormControl margin="normal" fullWidth required>
              <InputLabel htmlFor="text">Surname</InputLabel>
              <Input onChange={handleChange} id="lastname" name="lastname"/>
            </FormControl>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}


RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterForm);