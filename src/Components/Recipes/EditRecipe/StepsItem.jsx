import React, { Component } from 'react'
import {ListItem, ListItemText, Avatar} from '@material-ui/core'

export default class StepsItem extends Component {
  render() {
    return (
      <ListItem>
          <Avatar style={{margin: 10}}>{this.props.number}</Avatar>
            <ListItemText primary={this.props.step} />
      </ListItem>
    )
  }
}
