import React, { Component } from 'react'
import { withStyles, Paper, FormControl, InputLabel, Input, Typography, Grid, Button } from '@material-ui/core';
import Axios from 'axios';

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

class NewRecipePage extends Component {
    state={
        isUploaded: false,
        file: null,
    }
    // this.RecipeSubmit=this.RecipeSubmit.bind(this);

    RecipeSubmit(e){
        e.preventDefault();
        console.log(this.state.file)
        this.call()

    }

    call(){

        const data = new FormData();
        data.append('file', this.state.file, this.state.file.name);

    var page = "https://www.p4tr7k.me/API/Recipes/New_Recipe.php"
      var post = {
        'file': this.state.file,
      };

      Axios.post(page, data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

    handleFile = event => {
        this.setState({
            file: event.target.files[0],
        })
    }


  render() {
      const {classes} = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
        <Typography variant="h3">
            Add new Recipe
        </Typography>
            <form className={classes.form} onSubmit={(e) => this.RecipeSubmit(e)}>
            <Grid container alignItems="flex-end">
                <Grid item xs={12} sm>
                    <FormControl margin='normal' fullWidth>
                        <InputLabel>Recipe Name</InputLabel>
                        <Input></Input>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm>
                    <Input onChange={this.handleFile} type='file'>Upload Image</Input>
                </Grid>
            </Grid>
            
            
            <FormControl margin='normal' fullWidth>
                <InputLabel>Recipe Description</InputLabel>
                <Input 
                className={classes.multiline}
                disableUnderline={true}
                variant="outlined"
                multiline
                rows={4}
                ></Input>
            </FormControl>
            <Button
            type="submit"
            >
            Create Recipe</Button>

            </form>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(NewRecipePage);