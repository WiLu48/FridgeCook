import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles, Grid, Typography, Button, Hidden } from '@material-ui/core';
import { AuthContext } from '../Auth/Auth';


const styles = theme => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  main: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoContainer: {
    height: '100%',
  },
  link:{
    textDecoration: 'none',
  }

})

class WelcomeMsg extends Component {
  static contextType = AuthContext;
  render() {
    const {classes}= this.props;
    const {state} = this.context;
    return (
      <div className={classes.wrapper}>
          <Grid container className={classes.main}>
            <Grid item lg={2}>
            </Grid>
            <Grid item lg={7}>
            <Hidden smDown>
            <Typography style={{color: 'white'}} variant="h2">Welcome to Fridge Cook Club</Typography>
            <Typography style={{color: 'white'}}  variant="h5">Community driven Recipes for everyone</Typography>
            <div style={{marginTop: '10px', alignItems: 'center', display: 'flex'}}>
            {!state.isAuth ? 
            <>
              <Typography style={{color: 'white'}}  variant="subtitle1">Become part of Our Community and</Typography>
              <Link className={classes.link} to="/register"><Button  variant="text" color="secondary"><span style={{fontSize: '20px', fontWeight: 'bold'}}>SIGN UP</span></Button></Link>
              <Typography style={{color: 'white'}}  variant="subtitle1">Today!</Typography>
            </>
            : 
            <>
              <Typography style={{color: 'white'}}  variant="subtitle1">Check out Your</Typography>
              <Link className={classes.link} to="/dashboard"><Button  variant="text" color="secondary"><span style={{fontSize: '20px', fontWeight: 'bold'}}>DASHBOARD</span></Button></Link>
              <Typography style={{color: 'white'}}  variant="subtitle1">and Contribute to our Community!</Typography>
            </>
            }
              
            </div>
            <div style={{alignItems: 'center', display: 'flex'}}>
              <Typography style={{color: 'white'}}  variant="subtitle1">Or simply</Typography>
              <Link className={classes.link} to="/recipes"><Button  variant="text" color="secondary"><span style={{fontSize: '20px', fontWeight: 'bold'}}>VIEW</span></Button></Link>
              <Typography style={{color: 'white'}}  variant="subtitle1">our Recipes Now!</Typography>
            </div>
            </Hidden>
            <Hidden smUp>
            <div style={{paddingLeft: '10px'}}>
              <Typography style={{color: 'white'}} variant="h4">Welcome to Fridge Cook Club</Typography>
              <Typography style={{color: 'white'}}  variant="subtitle1">Community driven Recipes for everyone</Typography>
              <div style={{marginTop: '10px', alignItems: 'center', display: 'flex'}}>
              {!state.isAuth ? 
              <>
                <Typography style={{color: 'white'}}  variant="subtitle2">Become part of Our Community and</Typography>
                <Link className={classes.link} to="/register"><Button  variant="text" color="secondary"><span style={{fontSize: '15px', fontWeight: 'bold'}}>SIGN UP</span></Button></Link>
                <Typography style={{color: 'white'}}  variant="subtitle2">Today!</Typography>
              </>
              : 
              <>
                <Typography style={{color: 'white'}}  variant="subtitle2">Check</Typography>
                <Link className={classes.link} to="/dashboard"><Button  variant="text" color="secondary"><span style={{fontSize: '15px', fontWeight: 'bold'}}>DASHBOARD</span></Button></Link>
                <Typography style={{color: 'white'}}  variant="subtitle2">to Contribute!</Typography>
              </>
              }
              </div>
              <div style={{alignItems: 'center', display: 'flex'}}>
                <Typography style={{color: 'white'}}  variant="subtitle2">Or simply</Typography>
                <Link className={classes.link} to="/recipes"><Button  variant="text" color="secondary"><span style={{fontSize: '15px', fontWeight: 'bold'}}>VIEW</span></Button></Link>
                <Typography style={{color: 'white'}}  variant="subtitle2">our Recipes Now!</Typography>
              </div>
            </div>
            </Hidden>
            </Grid>
            <Hidden mdDown>
              <Grid item lg={2} style={{height: '100%'}}>      
                <img alt="" style={{marginLeft: '-100px',height: '100%'}} src="/Assets/HP_BG.png" />      
              </Grid>
            </Hidden>
            <Grid item lg={1}></Grid>
          </Grid>
        
      </div>
    )
  }
}

export default withStyles(styles)(WelcomeMsg);
