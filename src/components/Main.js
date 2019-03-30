import React from 'react'
import NavBar from './misc/NavBar';
import { Panel,Icon } from 'rsuite';
import { withAuthConsumer } from '../contexts/AuthStore'

class Main extends React.Component {
  
  render() {
    return (
      <div>
        <div className="main">
          <h1>Home</h1>
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
        </div>
      <NavBar/>
      </div>

    )
  }
}

export default withAuthConsumer(Main)