import React from 'react'
import { render } from 'react-dom';
import {Dog, Cat} from '../src/index'

function Foo() {
  return <div><Dog /><Cat /></div>
}


render(<Foo />, document.getElementById('main'));
