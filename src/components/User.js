import React, {Component} from 'react'
import NavBar from './misc/NavBar';
import { InputGroup ,Input ,Icon } from 'rsuite';
import ShoppingList from './home/ShoppingList'
import DoTask from './home/doTask'
import { Spring } from 'react-spring/renderprops'
import { withAuthConsumer } from '../contexts/AuthStore'

class User extends Component {
  
  render() {
    return (
      <div>
        <div className="user">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h1 style={props} >User</h1>}
          </Spring>
          <img src="https://source.unsplash.com/200x200/?man"/>
        
          <div className="shoppingList">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h2 style={props} >Shopping list</h2>}
          </Spring>
          <InputGroup className="shoppingListInput">
            <Input />
            <InputGroup.Button>
              <Icon icon="search" />
            </InputGroup.Button>
          </InputGroup>
          <DoTask>Comprar pan</DoTask>
          <DoTask>Slide.</DoTask>
          <DoTask>Slide.</DoTask>
          </div>
          <div className="shoppingList">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h2 style={props} >To do list</h2>}
          </Spring>
          <InputGroup className="shoppingListInput">
            <Input />
            <InputGroup.Button>
              <Icon icon="search" />
            </InputGroup.Button>
          </InputGroup>
          <DoTask>Comprar pan</DoTask>
          <DoTask>Slide.</DoTask>
          <DoTask>Slide.</DoTask>
          </div>
        </div>
      <NavBar/>
      </div>

    )
  }
}

export default withAuthConsumer(User)