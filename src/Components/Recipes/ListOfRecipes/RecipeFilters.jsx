import React, { Component } from 'react'
import { Button, withStyles, TextField, Grid } from '@material-ui/core';
import FilterList from '@material-ui/icons/FilterList';


const styles = theme => ({
    spacing: {
        margin: theme.spacing.unit,
        marginBottom: 0,
        borderRadius: 0,
        [theme.breakpoints.down("xs")]: {
            fontSize: '10px',
            margin: '3px'
        }
    },
    wrapper: {
        width: '1200px',
        margin: '0 auto'
    },
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginBottom: 0,
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
            width: 1200,
            margin: '0 auto',
            marginBottom: theme.spacing.unit,
            marginTop: theme.spacing.unit,
        },
      },
    gridWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    searchWrapper:{
        height: '36px',
        [theme.breakpoints.down("xs")]: {
            height:'50px',
        }
    },
    searchBar: {
        verticalAlign: 'baseline',
        float: 'right',
        marginRight:'10px',
        background: 'white',
        borderRadius: '4px',
        [theme.breakpoints.down("xs")]: {
            width: '100%',
            marginLeft: '10px'
        }

    },
    gridContainer: {
        [theme.breakpoints.down("xs")]: {
            flexDirection: 'column-reverse',
        }
    },
    filtersWrapper: {
        [theme.breakpoints.down("xs")]: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-evenly',
            marginTop: theme.spacing.unit,
            
        },
    },
    btnMobile: {
        margin: theme.spacing.unit,
        marginBottom: 0,
        borderRadius: 0,
        [theme.breakpoints.down("xs")]: {
            fontSize: '10px',
            margin: '3px',
            marginLeft: '10px'
        }
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
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} sm={8} md className={classes.filtersWrapper}>
                        <Button color={this.isActive(0) ? "secondary" : "default"} variant='contained'id="0" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>All</Button>
                        <Button color={this.isActive(1) ? "secondary" : "default"} variant='contained' id="1" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>Breakfast</Button>
                        <Button color={this.isActive(2) ? "secondary" : "default"} variant='contained' id="2" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>Dinner</Button>
                        <Button color={this.isActive(3) ? "secondary" : "default"} variant='contained' id="3" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>Desert</Button>    
                    </Grid>
                    <Grid item xs={12} sm={4} md className={classes.gridWrapper}>
                        {!ingredientsVisible && <Button variant='contained' color="primary" onClick={showIngredients} className={classes.btnMobile}>Search By Ingredients</Button>}
                        <TextField InputProps={{ className: classes.searchWrapper }} placeholder="Search..." variant="outlined" value={search} type="search" onChange={e => this.handleSearch(e.target.value)} className={classes.searchBar}  />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(RecipeFilters);
