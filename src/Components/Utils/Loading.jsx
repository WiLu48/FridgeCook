import React, { Component } from 'react'
import { withStyles, Paper, CircularProgress, Typography } from '@material-ui/core';

const styles = themes => ({
    main: {
        width: '300px',
        height: '200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    },
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }

})

 class Loading extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Paper sqaure className={classes.main}>
                <div className={classes.wrapper}>
                    <CircularProgress color="primary" style={{height: '60px', width: '60px', marginBottom: '30px'}}/>
                    <Typography variant="h6">
                       {this.props.title ? this.props.title : 'Loading...'}
                    </Typography>
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(Loading);
