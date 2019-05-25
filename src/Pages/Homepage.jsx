import React, { Component } from 'react'
import { withStyles, Divider } from '@material-ui/core';
import FeaturedRecipe from '../Components/Recipes/FeaturedRecipe/FeaturedRecipe';
import WelcomeMsg from '../Components/Homepage/WelcomeMsg';
import HomeHero from '../Components/Homepage/HomeHero';



const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
        width: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  bannerSpace: {
    backgroundImage: 'url(/Assets/Nav_Back.png)',
    height: '300px',
    width: '100%',
    backgroundColor: 'black',
  },
  innerWrapper: {
    paddingTop: '20px',
    textAlign: 'center'

  },
})


class Homepage extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  


  render() {
    const {classes} = this.props;
    return (
      <div className={classes.main}>
        <HomeHero />
        <FeaturedRecipe />
      </div>
    )
  }
}

export default withStyles(styles)(Homepage);
