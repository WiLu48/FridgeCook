import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SingleRecipe from '../Components/Recipes/SingleRecipe/SingleRecipe';
import Axios from 'axios';
import { AuthContext } from '../Components/Auth/Auth';
import AdminPanel from '../Components/Recipes/SingleRecipe/AdminPanel';


export default class SingleRecipePage extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props)
      this.state = {
        redirect: false,
      }
  }

  async componentDidMount(){    
    await this.checkIfVisible();
    this.context.state.admin == 1 ? this.context.checkAdmin() : this.setState({test: false});
    await this.shouldRedirect();
  }

  shouldRedirect(){
    this.state.Visible == 0 && this.context.state.userid != this.state.Author ? this.setState({redirect: true}) : this.setState({redirect: false})
  }

  async checkIfVisible(){
    const page = "https://p4tr7k.me/API/Recipes/Recipes.php?id="+this.props.match.params.id;

    await Axios.get(page)
    .then(res=> {
      this.setState({
        Visible: res.data.Visible,
        Author: res.data.Author,
      })
      
    })
    .catch(err => {

    })

  }

  redirect(){
    return <Redirect to="/recipes" />
  }


  render() {
    const {redirect} = this.state;
    return (
      <div>
        {redirect ? this.redirect() : null}
        <AdminPanel />
        <SingleRecipe 
        id={this.props.match.params.id} />
      </div>
    )
  }
}
