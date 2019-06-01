import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { blue } from '@material-ui/core/colors';
import { AuthContext } from '../Auth/Auth'
import { EmailOutlined, VpnKey } from '@material-ui/icons';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up(450 + theme.spacing.unit * 3 * 2)]: {
      width: 450,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  header: {
    width: '100%',
    height: '125px',
    // backgroundColor: '#ecbaba',
    // background: 'linear-gradient(0deg, rgba(58,124,180,1) 0%, rgba(117,160,198,1) 70%)',
    backgroundImage: 'url(Assets/LoginBanner.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: 'orange',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    borderRadius: 0,

  },
  title: {
    backgroundColor: 'blue',
  },
  inputwrapper: {
    display: 'flex',
    alignItems: 'baseline',
  },
  iconsWrapper: {
    paddingRight: '20px',
    marginLeft: '-10px',
  }
});



class LoginForm extends Component {
  static contextType = AuthContext;
  

  render(){

    const {classes} = this.props;
    const { login, handleChange } = this.context;
    

    return (
      <main className={classes.main}>
      <div className={classes.header}>
        <Typography style={{fontWeight: 'bold', color: 'white'}} component="h1" variant="h4">
          Sign in
        </Typography>
      </div>
        <Paper className={classes.paper} square>
          
          <Typography component='h1' variant="body1">
              {"Don't have account? "}
              <Link to="/register">Register here</Link>
          </Typography>
          
          <form className={classes.form} onSubmit={(e) => login(e)}>  
          <div className={classes.inputwrapper}>
            <EmailOutlined className={classes.iconsWrapper} />
            <FormControl margin="normal" required fullWidth>
              <InputLabel  htmlFor="email">  Email Address</InputLabel>
              <Input  onChange={handleChange} id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
          </div>
          <div className={classes.inputwrapper}> 
            <VpnKey className={classes.iconsWrapper} />    
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input onChange={handleChange} name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
          </div>
            <Button
              type="submit"
              style={{display: 'none'}}
            />            
          </form>
        </Paper>
        <Button
              square
              type="submit"
              onClick={(e) => login(e)}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
      </main>
    );
  }
  
};
    LoginForm.propTypes = {
      classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginForm);