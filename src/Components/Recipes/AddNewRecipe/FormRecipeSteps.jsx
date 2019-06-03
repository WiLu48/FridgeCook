import React, { Component } from 'react'
import { withStyles, Paper, FormControl, InputLabel, Input, Typography, Grid, Button, TextField, Fab, Table, TableHead, TableRow, TableCell, TableBody, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import StepsItem from './StepsItem';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        // marginLeft: theme.spacing.unit * 3,
        // marginRight: theme.spacing.unit * 3,
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
    btn: {
        marginTop: '-5px',
        width: '98%',
        borderRadius: 0,
        [theme.breakpoints.down(1000)]: {
            width: '95%',
        },
    },
    hover: {
        "&:hover": {
          backgroundColor: 'rgb(244, 66, 66, 0.3) !important',
          cursor: 'pointer',
      }
    }
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
      <div style={{width: '100%'}}>
        <main className={classes.main}>
        <Paper square className={classes.paper}>
        <Typography variant="h3">
            Instructions
        </Typography>
            <div className={classes.form}>     
                <form>
                    <Grid container
                    alignItems="center">
                        <Grid item xs={12}>
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
                        <Grid item xs={12} style={{textAlign: 'center'}}>
                            <Button className={classes.btn} variant="contained" color="primary" onClick={addStep}><AddIcon /></Button>
                        </Grid>
                    </Grid>
                    {values.isListSteps ? 
                        <Table style={{marginTop: '20px'}}>
                            <TableBody>
                            {stepsList.map((step, index) => 
                                <TableRow key={index} hover className={classes.hover} onClick={() => this.props.removeStep(index)}>
                                    <TableCell style={{fontSize: '0.9rem'}}>{index+1}. {step.instructions}</TableCell>
                                </TableRow>
                            )}
                            </TableBody>
                    </Table> : null}                    
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
                    Submit</Button>
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
