import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Card, CardHeader, CardMedia, CardContent, Typography, CardActionArea, Hidden} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    width: 310,
    margin: 10,
  },
  cardheader: {
    textAlign: 'center',
    width: '75%',
    margin: 'auto',
    marginTop: '-25px',
    background: 'white',
  },
  carddesc: {
    paddingTop: 0,
    height: '100px',
  },
  button: {
    width: '70%',
    margin: '0 auto',
    display: 'block',
    textAlign: 'center',
  },
  container: {
  },
});

class MyRecipesItem extends Component {
    state = {
      categoryname: {
        1: 'Breakfast',
        2: 'Dinner',
        3: 'Desert'
      },
    }

  render() {

    const { classes } = this.props;

    const link = "/recipes/" + this.props.id;

    const img = "https://www.p4tr7k.me/API/Recipes/Rec_Imgs/" + this.props.image;

    
    return(
      <div className={classes.container}>
      <Grid item lg={6}>
      <Card 
          className={classes.card}
          key={this.props.key}
          >
          <CardActionArea>
            <CardMedia
              style={{height: 0, paddingTop: '56.25%'}}
              image={img}
              />
            <CardContent>
              <Typography style={{textAlign: 'center', overflow: 'hidden'}} variant="h6">
                {this.props.name}
              </Typography>
            </CardContent>
          </CardActionArea>         
          <Button variant="contained" color="primary" className={classes.button} component={props => <Link to={link} {...props}/>} >
            Full Recipe
          </Button>
        </Card>
      </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(MyRecipesItem);
