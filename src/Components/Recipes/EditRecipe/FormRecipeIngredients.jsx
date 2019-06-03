import React, { Component } from 'react'
import { withStyles, Paper, FormControl, InputLabel, Input, Typography, Grid, Button, TextField, Fab, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IngredientItem from './IngredientItem';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
            width: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    hover: {
        "&:hover": {
          backgroundColor: 'rgb(244, 66, 66, 0.3) !important',
          cursor: 'pointer',
      }
    }
})


class FormRecipeIngredients extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };



  render() {

    const { values, handleChange, classes, addIng } = this.props;
    const ingredientList = values.recIngredients;

    return (        
      <div>
        <main className={classes.main}>
        <Paper square className={classes.paper}>
        <Typography variant="h3">
            Add Recipe Ingredients
        </Typography>
            <div className={classes.form}>     
                <form>
                    <Grid container
                    alignItems="center">
                        <Grid item xs>
                            <FormControl margin='normal' fullWidth>
                                <TextField
                                value={values.ingredient}
                                name="ingredient"
                                onChange={handleChange}
                                className={classes.textField}
                                label="Ingredient Name"
                                variant="outlined"></TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <FormControl margin='normal' fullWidth>
                            <TextField
                                value={values.amount}
                                className={classes.textField}
                                name="amount"
                                label="Amount"
                                onChange={handleChange}
                                variant="outlined"></TextField>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Fab style={{borderRadius: 0, marginTop: '10px'}} size="small" variant="round" color="primary" onClick={addIng}><AddIcon /></Fab>
                        </Grid>
                    </Grid>
                    {values.isList ? 
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Ingredient Name</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                            {ingredientList.map((ingredient, i) => 
                                <TableRow key={i} hover className={classes.hover} onClick={() => this.props.removeIng(i)}>
                                    <IngredientItem
                                    name={ingredient.ingredientName}
                                    amount={ingredient.amount}
                                    />
                                </TableRow>
                            )}
                        </TableBody> 
                    </Table> : null}                    
                <div style={{textAlign: 'center', marginTop: '10px'}}>
                    <Button
                    style={{marginRight: '5px', borderRadius: 0}}
                    variant="contained"
                    color="secondary"
                    onClick={this.back}
                    >
                    Back</Button>
                    <Button
                    style={{borderRadius: 0}}
                    variant="contained"
                    color="primary"
                    onClick={this.continue}
                    >
                    Next</Button>
                </div>
                </form>
            </div>
        </Paper>
      </main>
      </div>
    )
  }
}

export default withStyles(styles)(FormRecipeIngredients);
