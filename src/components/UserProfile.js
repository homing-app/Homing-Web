import React, {Component} from 'react'
import NavBar from './misc/NavBar';
import { Redirect } from 'react-router-dom';
import { Alert, Form, message, HelpBlock, Schema, InputGroup ,Input ,Icon, FlexboxGrid, DatePicker } from 'rsuite';
import ShoppingList from './home/ShoppingList'
import service from '../services/HomeService'
import userService from '../services/UserService'
import ItemService from '../services/ItemService'
import ItemLogService from '../services/ItemLogService'
import TaskService from '../services/TaskService'
import MomentService from '../services/MomentService'
import DoTask from './home/doTask'
import { Spring } from 'react-spring/renderprops'
import { withAuthConsumer } from '../contexts/AuthStore'
import { Doughnut } from 'react-chartjs-2';


class User extends Component {
constructor(props) {
  super(props);
  this.state = {
    name: "",
    tasks: 0,
    roomsCleaned: 0,
    attachment: "",
    formItem: {
      name: "",
    },
    formTask: {
      name: ""
    },
    formMoment: {
      name: "",
      moment: ""
    },
    items: [],
    tasks: [],
    moments: [],
    log: [],
    itemResume:[],
    taskResume: [],
    roomResume: [],
    toLogin: false
  }
}

  getUserDetails = () => {
    userService.details(this.props.user.id)
    .then(items => {
      this.setState({...this.state, ...items})
    },error => {this.setState({toLogin : true})})
  }

  getLog = () => {
    service.details(this.props.user.home)
    .then(response => {
      const itemsUser = response.log.filter(item => item.user == this.props.user.id && item.state === "done" && item.type === "Item");
      const itemsOthers = response.log.filter(item => item.user !== this.props.user.id && item.state === "done" && item.type === "Item");
      const tasksUser = response.log.filter(item => item.user == this.props.user.id && item.state === "done" && item.type === "Task");
      const tasksOthers = response.log.filter(item => item.user !== this.props.user.id && item.state === "done" && item.type === "Task");
      const roomsUser = response.log.filter(item => item.user == this.props.user.id && item.state === "clean" && item.type === "Room");
      const roomsOthers = response.log.filter(item => item.user !== this.props.user.id && item.state === "clean" && item.type === "Room");
      this.setState({ 
        itemResume: [itemsUser.length,itemsOthers.length],
        taskResume: [tasksUser.length,tasksOthers.length],
        roomResume: [roomsUser.length,roomsOthers.length]
      }, () => console.log(this.state.itemResume,this.state.taskResume,this.state.roomResume))
    })
  }


  componentDidMount = () => {
    this.getUserDetails()
    this.getLog()
  }

  // TASKS
  
  handleChangeTask = (event) => {
    this.setState({ formTask: {
      name: event
    }
    })
  }

  handleSubmitTask = (e) => {
    e.preventDefault();
    TaskService.create({
      name: this.state.formTask.name,
      user: this.props.user.id,
      home: this.props.user.home
    })
    .then(
      (task) => {
        const log = {
          type: "Task",
          name: task.name,
          idTask: task._id,
          state: "created",
          home: task.home,
          user: this.props.user.id,
          username: this.props.user.name,
          userImage: this.props.user.attachment
        }
        ItemLogService.create(log)
          .then(console.log("log created!"))
        this.setState({
          formTask: {
            name: ""
          },
          tasks: [
            ...this.state.tasks,
            task
          ]
        })
      }, (error) => console.error(error)
    )
  }

  // ITEMS

  handleChangeItem = (event) => {
    this.setState({ formItem: {
      name: event
    }
    })
  }
  

  handleSubmitItem = (e) => {
    e.preventDefault();
    ItemService.create({
      name: this.state.formItem.name,
      user: this.props.user.id,
      home: this.props.user.home
    })
    .then(
      (item) => {
        const log = {
          type: "Item",
          name: item.name,
          idTask: item._id,
          state: "created",
          home: item.home,
          user: this.props.user.id,
          username: this.props.user.name,
          userImage: this.props.user.attachment
        }
        ItemLogService.create(log)
          .then(console.log("log created!"))
        this.setState({
          formItem: {
            name: ""
          },
          items: [
            ...this.state.items,
            item
          ]
        })
      }, (error) => console.error(error)
    )
  }

  //DATE

  handleChangeMomentName = (event) => {
    this.setState({ formMoment: {
      name: event
    }
    })
  }

  handleChangeMoment = (event) => {
    this.setState({ formMoment: {
      ...this.state.formMoment,
      moment: event
    }
    })
  }

  handleSubmitMoment = (e) => {
    e.preventDefault();
    MomentService.create({
      name: this.state.formMoment.name,
      moment: this.state.formMoment.moment,
      user: this.props.user.id,
      home: this.props.user.home,
    })
    .then(
      (moment) => {
        this.setState({
          formMoment: {
            name: ""
          },
          moments: [
            ...this.state.moments,
            moment
          ]
        }, () => this.setState({
          formMoment: {
            name: "",
            moment: ""
          }
        },() => {
          const log = {
            type: "Moment",
            name: moment.name,
            idTask: moment._id,
            state: `created`,
            home: moment.home,
            user: this.props.user.id,
            username: this.props.user.name,
            userImage: this.props.user.attachment
          }
          ItemLogService.create(log)
            .then(console.log("log created!"))
        }))
      }, (error) => {
        Alert.warning(error)
        console.error(error)
      }
    )
  }

  completeTask = (id, type) => {
    if(type === "task") {
      TaskService.edit(id)
      .then((response) => {
        const log = {
          type: "Task",
          name: response.name,
          idTask: response._id,
          state: response.state,
          home: response.home,
          user: this.props.user.id,
          username: this.props.user.name,
          userImage: this.props.user.attachment
        }
        ItemLogService.create(log)
          .then(console.log("log created!"))
        const allTasks = this.state.tasks.filter(task => task._id !== id);
        this.setState({ tasks: allTasks })
      })
    } 
    if(type === "item") {
      ItemService.edit(id)
      .then((response) => {
        const log = {
          type: "Item",
          name: response.name,
          idTask: response._id,
          state: response.state,
          home: response.home,
          user: this.props.user.id,
          username: this.props.user.name,
          userImage: this.props.user.attachment
        }
        ItemLogService.create(log)
          .then(console.log("log created!"))
        const allItems = this.state.items.filter(task => task._id !== id);
        this.setState({ items: allItems }
        )
      })
    }
  }

  deleteTask = (id, type) => {
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
        const allItems = this.state.items.filter(task => task._id !== id);
        this.setState({ items: allItems })
      })
    }
  }


  
  render() {

    if(this.state.toLogin) {
      return(<Redirect to="/login"/>)
    }

    const { formItem,formTask,formMoment, itemResume, taskResume, roomResume  } = this.state

    const dataItem = {
      labels: ['you', 'others'],
      datasets: [{
          data: itemResume,
          backgroundColor: ['#36A2EB','#FF6384'],
          hoverBackgroundColor: ['#36A2EB','#FF6384']
      }]
  };
  const dataTask = {
    labels: ['you', 'others'],
    datasets: [{
        data: taskResume,
        backgroundColor: ['#36A2EB','#FF6384'],
        hoverBackgroundColor: ['#36A2EB','#FF6384']
    }]
};
const dataRoom = {
  labels: ['you', 'others'],
  datasets: [{
      data: roomResume,
      backgroundColor: ['#36A2EB','#FF6384'],
      hoverBackgroundColor: ['#36A2EB','#FF6384']
  }]
};

    return (
      <div>
        <div className="user">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h1 style={props} >{this.state.name.split(" ")[0]}</h1>}
          </Spring>
          <img src={this.state.attachment}/>
          <div className="SummaryWrapper">
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item colspan={6}>
            <Doughnut data={dataItem} legend={{display: false}} width={200} height={200}/>
            <h2>Items</h2>
            <h3>{dataItem[0]}</h3>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
            <Doughnut data={dataTask} legend={{display: false}} width={200} height={200}/>
            <h2>Tasks</h2>
            <h3>{dataTask[0]}</h3>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
            <Doughnut data={dataRoom} legend={{display: false}} width={200} height={200}/>
            <h2>Rooms</h2>
            <h3>{dataRoom[0]}</h3>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          </div>
          <div className="shoppingList">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h2 style={props} >Shopping list</h2>}
          </Spring>
          <form>
            <InputGroup className="shoppingListInput">
              <Input placeholder="Elemento a comprar" type="text" value={ formItem.name } onChange={this.handleChangeItem}/>
              <InputGroup.Button onClick={this.handleSubmitItem}>
                <Icon size="lg" icon="plus-square-o" />
              </InputGroup.Button>
            </InputGroup>
          </form>
          {this.state.items &&  (this.state.items.filter(item => item.state !== "done" ).map(item => <DoTask key={item._id} type="item" id={item._id} completeTask={this.completeTask} deleteTask={this.deleteTask} title={item.name}/>)) }
          </div>
          <div className="shoppingList">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h2 style={props} >To do list</h2>}
          </Spring>
          <form>
            <InputGroup className="shoppingListInput">
              <Input placeholder="Nombre de la tarea" type="text" value={ formTask.name } onChange={this.handleChangeTask}/>
              <InputGroup.Button onClick={this.handleSubmitTask}>
                <Icon size="lg" icon="plus-square-o" />
              </InputGroup.Button>
            </InputGroup>
          </form>
          {this.state.tasks &&  (this.state.tasks.filter(item => item.state !== "done" ).map(task => <DoTask key={task._id} type="task" id={task._id} completeTask={this.completeTask} deleteTask={this.deleteTask} title={task.name}/>)) }
          </div>
          <div className="shoppingList">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h2 style={props} >New date</h2>}
          </Spring>
          <form>
          <InputGroup className="shoppingListInput">
              <Input placeholder="Nombre del evento" type="text" value={ formMoment.name } onChange={this.handleChangeMomentName}/>
              <InputGroup.Button onClick={this.handleSubmitMoment}>
                <Icon size="lg" icon="plus-square-o" />
              </InputGroup.Button>
            </InputGroup>
          <DatePicker block 
            className="DatePicker"
            format="YYYY-MM-DD HH:mm:ss"
            placement="auto"
            value={ formMoment.moment }
            onChange={this.handleChangeMoment}
            placeholder="Elige una fecha"
            ranges={[
              {
                label: 'Tomorrow',
                value: new Date().setDate(new Date().getDate()+1)
              },
              {
                label: 'Next Week',
                value: new Date().setDate(new Date().getDate()+7)
              }
            ]}
            />
          </form>
          </div>
        </div>
      <NavBar style={{zIndex: 10}}/>
      </div>

    )
  }
}

export default withAuthConsumer(User)