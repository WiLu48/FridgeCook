import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles, Paper, FormControl, InputLabel, Input, Typography, Grid, Button, TextField, MenuItem, Select, OutlinedInput } from '@material-ui/core';
import { NONAME } from 'dns';


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
    },
    input: {
        display: 'none',
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
            <img style={{width: '75%', margin: '0 auto', display: 'block', borderRadius: '10px'}} alt="" src={values.recImg}></img>
            <Grid container alignItems="flex-end">
                <Grid item xs={12} sm>
                    <FormControl margin='normal' fullWidth>
                        <InputLabel>Recipe Name</InputLabel>
                        <Input onChange={handleChange} name="recName"></Input>
                    </FormControl>
                </Grid>
                
            </Grid>
            <Grid container alignItems="flex-end" justify="space-around">
                <Grid item xs={12} sm={3}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel>Select Recipe Level</InputLabel>
                        <Select 
                        value={values.recLevel}
                        onChange={handleChange}
                        name="recLevel"
                        >
                            <MenuItem value={1}>Easy</MenuItem>
                            <MenuItem value={2}>Intermediate</MenuItem>
                            <MenuItem value={3}>Expert</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl margin="normal" fullWidth>
                    <InputLabel>Select Recipe Category</InputLabel>
                    <Select 
                        value={values.recCat}
                        onChange={handleChange}
                        name="recCat"
                    >
                        <MenuItem value={1}>Breakfast</MenuItem>
                        <MenuItem value={2}>Dinner</MenuItem>
                        <MenuItem value={3}>Desert</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Input className={classes.input} type='file' onChange={handleFile} name="recfile" id="contained-button-file"/>
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">Upload Image</Button>
                    </label>
                </Grid>
            </Grid>     
            <FormControl margin='normal' fullWidth>
            <TextField
            onChange={handleChange}
            name="recDesc"
            label="Recipe Description"
            variant="outlined"
            multiline
            rows={4}></TextField>
            </FormControl>
            <div style={{textAlign: 'center', marginTop: '10px'}}>
                <Link style={{textDecoration: 'none'}} to="/dashboard">
                <Button
                style={{marginRight: '5px'}}
                variant="contained"
                color="secondary"
                >
                Cancel</Button></Link>
                <Button
                variant="contained"
                color="primary"
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
