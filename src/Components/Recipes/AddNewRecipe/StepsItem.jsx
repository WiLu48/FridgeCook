import React, { Component } from 'react'
import {ListItem, ListItemText, Avatar} from '@material-ui/core'

export default class StepsItem extends Component {
  render() {
    return (
      <ListItem>
            <ListItemText primary={this.props.number + ". " + this.props.step} />
      </ListItem>
    )
  }
}
