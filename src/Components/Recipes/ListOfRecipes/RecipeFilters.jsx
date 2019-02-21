import React, { Component } from 'react'
import { Button, withStyles } from '@material-ui/core';


const styles = theme => ({
    spacing: {
        margin: theme.spacing.unit,
    },
    mid: {
        textAlign: 'center',
    }
})

class RecipeFilters extends Component {

    handleButton(filter) {
        this.props.filterRecipes(filter);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.mid}>
            <Button variant='contained' id="0" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>All</Button>
            <Button variant='contained' id="2" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>Breakfast</Button>
            <Button variant='contained' id="1" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>Dinner</Button>
            <Button variant='contained' id="3" onClick={e => this.handleButton(e.currentTarget.id)} className={classes.spacing}>Desert</Button>            
        </div>
        )
    }
}

export default withStyles(styles)(RecipeFilters);
