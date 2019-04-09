import React, { Component } from 'react'
import {TableCell, TableRow} from '@material-ui/core'

export default class IngredientItem extends Component {
  render() {
    return (
      <TableRow>
            <TableCell>{this.props.name}</TableCell>
            <TableCell>{this.props.amount}</TableCell>
      </TableRow>
    )
  }
}
