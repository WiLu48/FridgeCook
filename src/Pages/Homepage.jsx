import React, { Component } from 'react'
import { withStyles, Divider, Typography, Button } from '@material-ui/core';
import FeaturedRecipe from '../Components/Recipes/FeaturedRecipe/FeaturedRecipe';



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

  }
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
        <div className={classes.innerWrapper}>
          <Typography style={{color: 'white'}} variant="h4">
            I want to see...
          </Typography>
          <div>
            <Button variant="raised" >All Recipes</Button>
            <Button variant="raised" >Search By Ingredients</Button>
          </div>
        </div>  
      </div>
      <Divider />
      <FeaturedRecipe />
      </>
    )
  }
}

export default withStyles(styles)(Homepage);
