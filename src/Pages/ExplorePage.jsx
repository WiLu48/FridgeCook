import React, { useContext, Component } from 'react'
import { AuthContext } from '../Components/Auth/Auth'
const ExplorePage = () => {
    const context = useContext(AuthContext)
    console.log(context.checkAuth)
    return(
        <h1>test</h1>
    )
}

export default ExplorePage
