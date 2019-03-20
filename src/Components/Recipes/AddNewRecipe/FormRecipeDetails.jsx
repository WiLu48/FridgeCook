import React, { Component } from 'react'
import { withStyles, Paper, FormControl, InputLabel, Input, Typography, Grid, Button } from '@material-ui/core';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    multiline: {
        border: 'solid 1px grey',
    }
})


class FormRecipeDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

  render() {

    const { values, handleChange, handleFile, classes } = this.props;

    return (        
      <div>
        <main className={classes.main}>
        <Paper className={classes.paper}>
        <Typography variant="h3">
            Add new Recipe
        </Typography>
            <div className={classes.form}>
            <Grid container alignItems="flex-end">
                <Grid item xs={12} sm>
                    <FormControl margin='normal' fullWidth>
                        <InputLabel>Recipe Name</InputLabel>
                        <Input onChange={handleChange} name="recName"></Input>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm>
                    <img style={{width: '100%'}} alt="" src={values.recImg}></img>
                    <Input type='file' onChange={handleFile} name="recfile">Upload Image</Input>
                </Grid>
            </Grid>            
            
            <FormControl margin='normal' fullWidth>
                <InputLabel>Recipe Description</InputLabel>
                <Input 
                onChange={handleChange}
                name="recDesc"
                className={classes.multiline}
                disableUnderline={true}
                variant="outlined"
                multiline
                rows={4}
                ></Input>
            </FormControl>
            <div>
                <Button
                style={{float: 'left'}}
                onClick={this.continue}
                >
                Save</Button>
                <Button
                style={{float: 'right'}}
                onClick={this.continue}
                >
                Next</Button>
            </div>

            </div>
        </Paper>
      </main>
      </div>
    )
  }
}

export default withStyles(styles)(FormRecipeDetails);
