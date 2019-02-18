import React, { Component } from 'react'
import { Grid, Card, CardHeader, CardMedia, CardContent, Typography} from '@material-ui/core'


export default class SingleRecipe extends Component {
  render() {
    return(
      <Grid item sm
      style={{width: '400px'}}
      >
        <Card 
          style={{width: '400px'}}
          key={this.props.id}
          >          
          <CardMedia
            style={{height: 0, paddingTop: '56.25%'}}
            image={this.props.image}
          />
          <CardHeader
            title={this.props.name}
          />
          <CardContent>
            <Typography>
              {this.props.desc}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}
