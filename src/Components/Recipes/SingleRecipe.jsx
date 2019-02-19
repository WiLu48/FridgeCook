import React, { Component } from 'react'
import { Button, Grid, Card, CardHeader, CardMedia, CardContent, Typography, CardActionArea} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: 10,
  },
  cardheader: {
    textAlign: 'center',
    width: '75%',
    margin: 'auto',
    marginTop: '-25px',
    background: 'white'
  },
  carddesc: {
    paddingTop: 0,
    height: '200px',
  },
  button: {
    width: '100%',
    margin: 'auto',
  },
});

class SingleRecipe extends Component {
  state = {
    categoryname: '',
  }

  render() {

    const catid = this.props.cat;

    // if (catid === '1') {
    //   this.setState({
    //     categoryname: 'Dinner'
    //   })
    // } else if (catid === '2') {
    //   this.setState({
    //     categoryname: 'Breakfast'
    //   })
    // } else if (catid === '3') {
    //   this.setState({
    //     categoryname: 'Desert'
    //   })
    // }

    const { classes } = this.props;
    
    return(
      <Grid item>
        <Card 
          className={classes.card}
          key={this.props.id}
          >          
          <CardMedia
            style={{height: 0, paddingTop: '56.25%'}}
            image={this.props.image}
          />
          <CardHeader
          className={classes.cardheader}
          title={this.props.name}
          />
          <CardContent
          className={classes.carddesc}
          >
          <Typography>
            <i className="fas fa-utensils"></i>
            {this.state.categoryname}
          </Typography>
          <Typography>
            {this.props.desc}
          </Typography>
          </CardContent>
          <CardActionArea>
            <Button variant="contained" className={classes.button}>
              Full Recipe
            </Button>
          </CardActionArea>
        </Card>
      </Grid>
    )
  }
}

export default withStyles(styles)(SingleRecipe);
