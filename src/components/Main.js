import React, {Component} from 'react'
import NavBar from './misc/NavBar';
import { Panel,Icon } from 'rsuite';
import ShoppingList from './home/ShoppingList'
import { Spring } from 'react-spring/renderprops'
import { withAuthConsumer } from '../contexts/AuthStore'

class Main extends Component {
  
  render() {
    return (
      <div>
        <div className="main">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h1 style={props} >Home</h1>}
          </Spring>
          <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"/>
          <div className="infoPanel">
          <Panel  header={<h3>Casita</h3>} bordered collapsible>
            <p>Aqui va la información de la casa</p>
          </Panel>
          </div>
          <div className="row flex-row scrolling-wrapper">
          <div className="roomDiv">
            <div className="box">
            {<Icon className="navGearIcon" size="2x" icon="gear"/>}
            </div>
            <p>Holita</p>
          </div>
          <div className="roomDiv">
          <div className="box">
            {<Icon className="navGearIcon" size="2x" icon="gear"/>}
            </div>
            <p>Holita</p>
          </div>
          <div className="roomDiv">
          <div className="box">
            {<Icon className="navGearIcon" size="2x" icon="gear"/>}
            </div>
            <p>Holita</p>
          </div>
          <div className="roomDiv">
          <div className="box">
            {<Icon className="navGearIcon" size="2x" icon="gear"/>}
            </div>
            <p>Holita</p>
          </div>
          <div className="roomDiv">
          <div className="box">
            {<Icon className="navGearIcon" size="2x" icon="gear"/>}
            </div>
            <p>Holita</p>
          </div>
          <div className="roomDiv">
          <div className="box">
            {<Icon className="navGearIcon" size="2x" icon="gear"/>}
            </div>
            <p>Holita</p>
          </div>
          <div className="roomDiv">
          <div className="box">
            {<Icon className="navGearIcon" size="2x" icon="gear"/>}
            </div>
            <p>Holita</p>
          </div>
          </div>
          <div className="shoppingList">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h2 style={props} >Shopping list</h2>}
          </Spring>
          <ShoppingList items={["pan", "lentejas","comida conejo","serrín"]} />
          </div>
          <div className="shoppingList">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h2 style={props} >To do list</h2>}
          </Spring>
          <ShoppingList items={["Pruebas alergia Byron", "Llamar al casero","Limpiar microondas","Cambiar bombilla frigo"]} />
          </div>
        </div>
      <NavBar/>
      </div>

    )
  }
}

export default withAuthConsumer(Main)