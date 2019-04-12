import React, { Component } from 'react'


class Homepage extends Component {
  constructor(props){
    super(props)
    this.test=React.createRef();
  }

  click = () => {
    this.test.current.test();
  }

  render() {
    return (
      <div style={{marginTop: '-150px',backgroundImage: 'url(/Assets/Nav_Back.png)', height: '500px', width: '100%', backgroundColor: 'black'}}>    
        lol
      </div>
    )
  }
}

export default Homepage;
