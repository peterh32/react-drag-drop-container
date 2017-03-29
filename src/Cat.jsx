import React from 'react'


export default class Cat extends React.Component {
  meow() {
    alert('Meow meow meow');
  }

  render() {
    return <div onClick={this.meow}><h2>Cat</h2></div>
  }
}
