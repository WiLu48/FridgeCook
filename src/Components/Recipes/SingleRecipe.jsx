import React, { Component } from 'react'
import { Button, Grid, Card, CardHeader, CardMedia, CardContent, Typography, CardActionArea, Hidden} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  card: {
    width: 300,
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
    width: '100%',
    margin: 'auto',
    borderRadius: 0,
  },
  title: {
    fontSize: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  container: {
  },
});

class SingleRecipe extends Component {
  state = {
    categoryname: {
      1: 'Dinner',
      2: 'Breakfast',
      3: 'Desert'
    },
  }

  render() {

    const { classes } = this.props;
    
    return(
      <div className={classes.container}>
      <Grid item lg={6}>
      <Card 
          className={classes.card}
          key={this.props.id}
          >         
          <CardMedia
            style={{height: 0, paddingTop: '56.25%'}}
            image={this.props.image}
          />
          <CardHeader
          classes = {{title: classes.title}}
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
          <Button variant="contained" className={classes.button}>
            Full Recipe
          </Button>
        </Card>
      </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(SingleRecipe);
