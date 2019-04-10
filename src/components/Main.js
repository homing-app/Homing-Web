import React, {Component} from 'react'
import NavBar from './misc/NavBar';
import { Panel } from 'rsuite';
import { Spring } from 'react-spring/renderprops'
import { withAuthConsumer } from '../contexts/AuthStore'
import service from '../services/HomeService'
import Room from './home/Room'
import DoTask from './home/doTask'
import ItemService from '../services/ItemService'
import TaskService from '../services/TaskService'
import RoomService from '../services/RoomService'
import ItemLogService from '../services/ItemLogService'
import UserBullet from './home/UserBullet'
import InfoItem from './home/InfoItem'

class Main extends Component {

  state = {
    home: {
      attachment: "",
      homeCode: ""
    },
    name: "",
    users: [],
    items: [],
    tasks: [],
    rooms: []
  }

  getDetails = () => {
    service.details(this.props.user.home)
    .then(response => {
      this.setState({...this.state, ...response});
    })
  }
  componentDidMount = () => {
    this.getDetails()
    console.log(this)
  }

  completeTask = (id, type) => {
    if(type === "task") {
      TaskService.edit(id)
        .then((response) => {
          const allTasks = this.state.tasks.filter(task => task._id !== id);
          this.setState({ tasks: allTasks },() => {
            const log = {
              type: "Task",
              name: response.name,
              idTask: response._id,
              state: response.state,
              home: response.home,
              user: this.props.user.id
            }
            ItemLogService.create(log)
              .then(console.log("log created!"))
          })
        })
    } 
    if(type === "item") {
      ItemService.edit(id)
      .then((response) => {
        const allItems = this.state.items.filter(item => item._id !== id);
        this.setState({ items: allItems },() => {
          const log = {
            type: "Task",
            name: response.name,
            idTask: response._id,
            state: response.state,
            home: response.home,
            user: this.props.user.id
          }
          ItemLogService.create(log)
            .then(console.log("log created!"))
        })
      })
    }
  }

  deleteTask(id, type) {
    if(type === "task") {
      TaskService.remove(id)
      .then(() => {
        const allTasks = this.state.tasks.filter(task => task._id !== id);
        this.setState({ tasks: allTasks })
      })
    } 
    if(type === "item") {
    ItemService.remove(id)
    .then(() => {
      const allItems = this.state.items.filter(item => item._id !== id);
      this.setState({ items: allItems }, )
    })
  }
  }

  cleanRoom = (room, situation) => {
    RoomService.edit(room, situation)
      .then(response => {
      const allRooms = [...this.state.rooms];
      allRooms.forEach((room, index) => {
        if(response._id === room._id) {
          allRooms[index]= response;
        }
      })
      this.setState({ rooms: allRooms }, () => {
        const log = {
          type: "Room",
          name: response.name,
          idTask: response._id,
          state: response.state,
          home: response.home,
          user: this.props.user.id
        }
        ItemLogService.create(log)
          .then(console.log("log created!"))
      })
  })
}

  render() {
    return (
      <div>
        <div className="main">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h1 style={props}>{this.state.name}</h1>}
          </Spring>
          <div className="scrolling-wrapper usersDiv">
          {this.state.users.length && this.state.users.map(user => <UserBullet {...user} key={user.name} />)}
          </div>
          <img className="homeImg" src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"/>
          <div className="infoPanel">
          <Panel  header={<h3>Info</h3>} bordered collapsible>
          {this.state.info && this.state.info.map(infoItem => <InfoItem {...infoItem} key={infoItem._id} />) }
          </Panel>
          </div>
          <div className="row flex-row scrolling-wrapper">
          {/* {!this.state.rooms.length && <span>loading</span>} */}
          {this.state.rooms.length && this.state.rooms.map(room => <Room {...room} key={room._id} cleanRoom={this.cleanRoom} />) }
          </div>
          <div className="shoppingList">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h2 style={props} >Shopping list</h2>}
          </Spring>
          {this.state.items.length &&  (this.state.items.filter(item => item.state !== "done" ).map(item => <DoTask key={item._id} type="item" id={item._id} completeTask={this.completeTask} deleteTask={this.deleteTask} title={item.name}/>)) }
          </div>
          <div className="shoppingList">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h2 style={props} >To do list</h2>}
          </Spring>
          {this.state.tasks.length &&  (this.state.tasks.filter(item => item.state !== "done" ).map(task => <DoTask key={task._id} type="task" id={task._id} completeTask={this.completeTask} deleteTask={this.deleteTask} title={task.name}/>)) }
          </div>
        </div>
      <NavBar/>
      </div>

    )
  }
}

export default withAuthConsumer(Main)