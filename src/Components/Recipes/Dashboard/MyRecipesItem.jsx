import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Card, CardHeader, CardMedia, CardContent, Typography, CardActionArea, Hidden} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  gridWrapper: {
    padding: '5px',
    boxSizing: 'border-box',
    [theme.breakpoints.down("xs")]: {
      width:'100%',
    },    
  },
  cardheader: {
    textAlign: 'center',
  },
  carddesc: {
    paddingTop: 0,
    height: '100px',
    overflow: 'hidden'
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
      <Grid item sm={12} md={4} lg={4} className={classes.gridWrapper}>
      <Card 
        square
        key={this.props.key}
        >
        <CardActionArea component={props => <Link to={link} {...props}/>} >
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
        </Card>
      </Grid>
    )
  }
}

export default withStyles(styles)(MyRecipesItem);
