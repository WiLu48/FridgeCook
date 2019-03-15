import React, { Component } from 'react'
import { AuthContext } from '../Components/Auth/Auth';

export default class Dashboard extends Component {
  static contextType = AuthContext;
  render() {
    const {checkAuth} = this.context;
    checkAuth();
    return (
      <div>
        <h1>DASHBOARD BITCHES</h1>
      </div>
    )
  }
}
