import React, { Component } from 'react'
import { withStyles, Divider } from '@material-ui/core';
import FeaturedRecipe from '../Components/Recipes/FeaturedRecipe/FeaturedRecipe';
import WelcomeMsg from '../Components/Homepage/WelcomeMsg';



const styles = theme => ({
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
      <>
      <div className={classes.bannerSpace}>  
        <WelcomeMsg />
      </div>
      <Divider />
      <FeaturedRecipe />
      </>
    )
  }
}

export default withStyles(styles)(Homepage);
