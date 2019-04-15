import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles, Paper, Table, TableRow, TableCell, Typography, Button, TableHead, Tooltip } from '@material-ui/core';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
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
    link: {
        color: 'white',
        textDecoration: 'none',
    },
    hover: {
        "&:hover": {
          backgroundColor: 'rgb(244, 66, 66, 0.3) !important',
          cursor: 'pointer',
      }
    },
})

 class ShoppingList extends Component {
     state={

     }


    clear = () => {
        this.setState({
            shoppingList: undefined
        })
        localStorage.removeItem('SL');

    }

    componentDidMount(){
        this.setState({
            shoppingList: JSON.parse(localStorage.getItem('SL'))
        })
    }

    removeIngredient(i) {

        this.state.shoppingList.splice(i,1)
        this.setState({shoppingList: this.state.shoppingList});
        localStorage.setItem("SL", JSON.stringify(this.state.shoppingList));
        if(this.state.shoppingList.length == 0) {this.setState({shoppingList: undefined})}
    }


    

  render() {

    const {shoppingList} = this.state;
    const {classes} = this.props;
    
    return (
      <div className={classes.main}>
      {shoppingList ?
          <Paper className={classes.paper}>
              <Table>
                  <Typography style={{textAlign: 'center', marginBottom: '5px'}} variant="h4">Shopping List</Typography>
                  {shoppingList.map((ing, i) => {
                      return(
                          <TableRow hover className={classes.hover}>
                            <Tooltip title="Remove Ingredient">
                              <TableCell onClick={() => this.removeIngredient(i)} key={ing.Ingredient_Name}>{ing.Ingredient_Name} - {ing.Ingredient_Amount}</TableCell>
                            </Tooltip>
                          </TableRow>
                        )})}
                        <Button style={{marginTop: '10px', float: 'right'}} onClick={this.clear} variant="outlined" color="secondary">Clear List</Button>
                </Table>
          </Paper>
        :
        <>
        <Typography style={{textAlign: 'center'}} variant="h4">Your shopping list appear to be empty</Typography>
        <div style={{width: '100%', marginTop: '10px', textAlign: 'center'}}>
            <Link to="/recipes" className={classes.link}><Button  color="primary" variant="contained">View Recipes</Button></Link>
        </div>
        </>}  
      </div>
    )
  }
}

export default withStyles(styles)(ShoppingList);
