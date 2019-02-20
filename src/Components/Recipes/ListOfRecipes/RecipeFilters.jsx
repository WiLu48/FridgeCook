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

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.mid}>
            <Button variant='contained' value="0" className={classes.spacing}>All</Button>
            <Button variant='contained' value="2" className={classes.spacing}>Breakfast</Button>
            <Button variant='contained' value="1" className={classes.spacing}>Dinner</Button>
            <Button variant='contained' value="3" className={classes.spacing}>Desert</Button>            
        </div>
        )
    }
}

export default withStyles(styles)(RecipeFilters);
