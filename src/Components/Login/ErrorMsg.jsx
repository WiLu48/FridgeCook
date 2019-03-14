import React from 'react'
import { AuthConsumer } from '../Auth/Auth';
import { withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
    wrapper: {
        marginTop: theme.spacing.unit * 4,
        alignText: 'center',
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
          width: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
})


function ErrorMsg (props) {
    const {classes} = props;
    return(
        <Paper className={classes.wrapper}>
            <AuthConsumer>
                {value => value.error}
            </AuthConsumer>
        </Paper>
    )
}

export default withStyles(styles)(ErrorMsg);