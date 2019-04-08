import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SingleRecipe from '../Components/Recipes/SingleRecipe/SingleRecipe';
import Axios from 'axios';
import { AuthContext } from '../Components/Auth/Auth';
import AdminPanel from '../Components/Recipes/SingleRecipe/AdminPanel';
import AuthorPanel from '../Components/Recipes/SingleRecipe/AuthorPanel';


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

  checkIfAdmin() {
    this.context.state.admin ? this.context.checkAdmin() : this.setState({redirect: false});
  }

  shouldRedirect(){
    this.state.Visible == 0 && this.context.state.userid != this.state.Author && this.state.admin == 0 ? this.setState({redirect: true}) : this.setState({redirect: false})
  }

  async checkPermissions(){
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

    var page2 = "https://www.p4tr7k.me/API/Account/Admin.php"
    var post2 = {
      'id': this.context.state.userid,
      'key': this.context.state.key,
    };

    await Axios.post(page2, post2)
      .then(res => {
        this.setState({admin: 1})

      })
      .catch(err => {
        sessionStorage.removeItem('admin')
        this.setState({admin: 0})
      })

  }

  changeState(x, y){
    this.setState({[x]: y})
  }


  redirect(){
    return <Redirect to="/recipes" />
  }


  render() {
    const {admin, Author, redirect, Visible} = this.state;
    return (
      <div>
        {this.props.test}
        {redirect ? this.redirect() : null}
        {admin == 1 && <AdminPanel visible={Visible} changeState={this.changeState} recID={this.props.match.params.id}/>}
        {this.context.state.userid === Author && <AuthorPanel visible={Visible}/>}
        <SingleRecipe 
        id={this.props.match.params.id} />
      </div>
    )
  }
}
