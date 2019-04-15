import React, { Component } from 'react'
import { Paper, Typography, TextField, Button, withStyles, Fab, Table, TableBody, TableCell, TableRow, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    table: {
      width: '35%',
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
    },
    tableCell: {
      textAlign: 'center',
      fontSize: '20px'
    },
    hover: {
      "&:hover": {
        backgroundColor: 'rgb(244, 66, 66, 0.3) !important',
        cursor: 'pointer',
    }
    }
});

 class RecipesByIngredients extends Component {
  render() {
      const {classes, handleChange, addIngredient, ingredientsExists, ingredientName, ingredients, reset, hideIngredients, removeIngredient} = this.props;
    return (
      <div className={classes.main}>
        <Paper className={classes.paper} style={{position: 'relative'}}>
            <Typography variant="h4">Search By Ingredients</Typography>
            <div style={{display: 'inline-flex', alignItems: 'center', marginTop: '10px'}}>
                <TextField name="ingredientName" onChange={handleChange} value={ingredientName} style={{marginRight: '10px'}} variant="outlined" label="Ingredient's name">Ingredient's name</TextField>
                <Fab onClick={addIngredient} size="small" variant="round" color="primary" ><AddIcon /></Fab>
            </div>
            {ingredientsExists ?
            <>
            <Table className={classes.table}>
              <TableBody>
                {ingredients.map((ingredient, index) => 
                <React.Fragment key={index}>
                  <Tooltip title="Remove Ingredient" placement="right">
                  <TableRow hover className={classes.hover}><TableCell onClick={() => removeIngredient(index)} className={classes.tableCell}>{ingredient}</TableCell></TableRow>
                  </Tooltip>
                </React.Fragment>
                )}
              </TableBody>
            </Table>
            <Button variant="contained" color="secondary" onClick={reset}>Reset</Button>
            </>
            : null }
            <div style={{position: 'absolute', right: '10px'}}>
              <Button variant="outlined" onClick={hideIngredients}>Hide</Button>
            </div>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(RecipesByIngredients);
