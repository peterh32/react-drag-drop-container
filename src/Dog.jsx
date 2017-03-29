import React from 'react'
import './Dog.scss'

export default class Dog extends React.Component {
  bark() {
    alert('Woof woof woof');
  }

  render() {
    return <div className="dog_component" onClick={this.bark}><h2>Dog</h2></div>
  }
}
