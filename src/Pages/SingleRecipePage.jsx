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
      this.changeState=this.changeState.bind(this);
  }

  async componentDidMount(){    
    await this.checkPermissions();
    this.shouldRedirect();
  }

  shouldRedirect(){
    this.state.Visible == 0 && this.context.state.userid != this.state.Author && !this.state.isAdmin ? this.setState({redirect: true}) : this.setState({redirect: false})
  }

  async checkPermissions(){
    const page = "https://p4tr7k.me/API/Recipes/Recipes.php?id="+this.props.match.params.id;
    var page2 = "https://www.p4tr7k.me/API/Account/Admin.php"
    var post2 = {
      'id': this.context.state.userid,
      'key': this.context.state.key,
    };

    await Axios.post(page2, post2)
      .then(res => {
        this.setState({isAdmin: true})

      })
      .catch(err => {
        sessionStorage.removeItem('admin')
        this.setState({isAdmin: false})
      })

    await Axios.get(page)
    .then(res=> {
      this.setState({
        Visible: res.data.Visible,
        Author: res.data.Author,
        Image: res.data.Recipe_Image
      })
      if(this.state.Author == this.context.state.userid){this.setState({isAuthor: true})} 
      this.state.Author ? this.setState({recExists: true}) : this.setState({redirect: true})
      
    })
    .catch(err => {

    })


  }

  changeState(x, y){
    this.setState({[x]: y})
  }


  redirect(){
    return <Redirect to="/recipes" />
  }


  render() {
    const {isAdmin, isAuthor, redirect, Visible, recExists} = this.state;
    return (
      <div>
        { redirect ? this.redirect() : null }
        { isAdmin || isAuthor ? <AdminPanel visible={Visible} isAdmin={this.state.isAdmin} changeState={this.changeState} recID={this.props.match.params.id} img={this.state.Image} /> : null }
        { recExists ? <SingleRecipe 
        id={this.props.match.params.id} />
        : null }
      </div>
    )
  }
}
