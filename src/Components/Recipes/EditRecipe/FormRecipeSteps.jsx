import React, { Component } from 'react'
import { withStyles, Paper, FormControl, InputLabel, Input, Typography, Grid, Button, TextField, Fab, Table, TableHead, TableRow, TableCell, TableBody, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import StepsItem from './StepsItem';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
            width: 950,
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
})


class FormRecipeSteps extends Component {


    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };



  render() {

    const { values, handleChange, classes, addStep, submit } = this.props;
    const stepsList = values.recSteps;

    return (        
      <div>
        <main className={classes.main}>
        <Paper className={classes.paper}>
        <Typography variant="h3">
            Add Recipe Instructions
        </Typography>
            <div className={classes.form}>     
                <form>
                    <Grid container
                    alignItems="center">
                        <Grid item xs>
                            <FormControl margin='normal' fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    className={classes.textField}
                                    value={values.instruction}
                                    name="instruction"
                                    label="Recipe Step"
                                    variant="outlined"
                                    multiline
                                    rows={6}></TextField>
                                </FormControl>
                        </Grid>
                        <Grid item>
                            <Fab size="small" variant="round" color="primary" onClick={addStep}><AddIcon /></Fab>
                        </Grid>
                    </Grid>
                    {values.isListSteps ? 
                        <List>
                            {stepsList.map((step, index) => 
                                <StepsItem
                                style={{wordWrap: 'break-word'}}
                                key={step.instructions}
                                step={step.instructions}
                                number={index+1}
                                />
                            )}
                    </List> : null}                    
                    <div style={{textAlign: 'center', marginTop: '10px'}}>
                    <Button
                    style={{marginRight: '5px'}}
                    variant="contained"
                    color="secondary"
                    onClick={this.back}
                    >
                    Back</Button>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={submit}
                    >
                    Update Recipe</Button>
                </div>
                </form>
            </div>
        </Paper>
      </main>
      </div>
    )
  }
}

export default withStyles(styles)(FormRecipeSteps);
