import React, { Component } from 'react'
import { Button, withStyles, TextField, Grid } from '@material-ui/core';
import FilterList from '@material-ui/icons/FilterList';


const styles = theme => ({
    spacing: {
        margin: theme.spacing.unit,
        marginBottom: 0,
        borderRadius: 0,
    },
    wrapper: {
        width: '1200px',
        margin: '0 auto'
    },
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginBottom: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
            width: 1200,
            margin: '0 auto'
        },
      },
    gridWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    searchWrapper:{
        height: '36px'
    }
})

class RecipeFilters extends Component {
    state={
        search: '',
        active: 0,
    }

    handleButton(filter) {
        this.setState({search: "", active: filter});
        this.props.filterRecipes(filter);
 
    }

    handleSearch(input) {
        this.setState({search: input});
        this.props.inputRecipes(input);

    }

    isActive = (id) => {
        if(id == this.state.active) {
            return true
        } else {
            return false
        }
    }

    render() {
        const { classes, ingredientsVisible, showIngredients } = this.props;
        const { search } = this.state;
        return (
            <div className={classes.main}>
                <Grid container alignItems="flex-end">
                    <Grid item xs={12} md>
                        <Button color={this.isActive(0) ? "secondary" : "default"} variant='contained'id="0" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>All</Button>
                        <Button color={this.isActive(2) ? "secondary" : "default"} variant='contained' id="2" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>Breakfast</Button>
                        <Button color={this.isActive(1) ? "secondary" : "default"} variant='contained' id="1" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>Dinner</Button>
                        <Button color={this.isActive(3) ? "secondary" : "default"} variant='contained' id="3" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>Desert</Button>    
                    </Grid>
                    <Grid item xs={12} md className={classes.gridWrapper}>
                        {!ingredientsVisible && <Button variant='contained' color="primary" onClick={showIngredients} className={classes.spacing}>Search By Ingredients</Button>}
                        <TextField InputProps={{ className: classes.searchWrapper }} placeholder="Search..." variant="outlined" value={search} type="search" onChange={e => this.handleSearch(e.target.value)} style={{verticalAlign: 'baseline', float: 'right', marginRight:'10px', background: 'white', borderRadius: '4px'}}  />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(RecipeFilters);
