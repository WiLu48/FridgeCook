import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Card, CardHeader, CardMedia, CardContent, Typography, CardActionArea, Hidden} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    // width: 350,
    // margin: 10,
  },
  cardheader: {
    textAlign: 'center',
  },
  carddesc: {
    paddingTop: 0,
    height: '100px',
    overflow: 'hidden'
  },
  button: {
    width: '100%',
    margin: 'auto',
    borderRadius: 0,
  },
  container: {
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down(800)]: {
      whiteSpace: 'normal'
    },
  },
});

class SingleRecipe extends Component {
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
      <Grid item sm={12} md={6} lg={4} style={{padding: '10px'}}>
      <Card square
          className={classes.card}
          key={this.props.key}
          >         
          <CardMedia
            style={{height: 0, paddingTop: '56.25%'}}
            image={img}
          />
          <CardHeader
          classes={{
            title: classes.title
          }}
          className={classes.cardheader}
          title={this.props.name}
          />
          <CardContent
          className={classes.carddesc}
          >
          <Typography>
            <i className="fas fa-utensils"></i>
            {this.state.categoryname[this.props.cat]}
          </Typography>
          <Typography>
            {this.props.desc}
          </Typography>
          </CardContent>
          <Button variant="contained" color="primary" className={classes.button} component={props => <Link to={link} {...props} params={{test: 'test'}}/>} >
            Full Recipe
          </Button>
        </Card>
      </Grid>
    )
  }
}

export default withStyles(styles)(SingleRecipe);
