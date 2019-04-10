import React, {Component} from 'react'
import NavBar from './misc/NavBar';
import { Timeline,Icon, FlexboxGrid } from 'rsuite';
import { Spring } from 'react-spring/renderprops'
import { withAuthConsumer } from '../contexts/AuthStore'
import service from '../services/HomeService'
import { Doughnut } from 'react-chartjs-2';

class HomeSummary extends Component {

  state = {
    log: [],
    users: [],
    itemResume:[],
    taskResume: [],
    roomResume: []
  }

  componentDidMount = () => {
    this.getHomeDetails();
    this.getLog()
    console.log(this.state)
  }

  getHomeDetails = () => {
    service.details(this.props.user.home)
    .then(response => {
      this.setState({...response});
    })
  }

  getLog = () => {
    service.details(this.props.user.home)
    .then(response => {
      const totalItems = [];
      const totalTasks = [];
      const totalRooms = [];

      this.state.users.forEach(user => {
        const itemsUser = response.log.filter(item => item.user == user.id && item.state === "done" && item.type === "Item").length;
        totalItems.push(itemsUser)
        const tasksUser = response.log.filter(item => item.user == user.id && item.state === "done" && item.type === "Task").length;
        totalTasks.push(tasksUser)
        const roomsUser = response.log.filter(item => item.user == user.id && item.state === "clean" && item.type === "Room").length;
        totalRooms.push(roomsUser)
      })

      this.setState({ 
        itemResume: totalItems,
        taskResume: totalTasks,
        roomResume: totalRooms
      })
    })
  }
  
  render() {
    const { itemResume, taskResume, roomResume, users} = this.state
    const userLabels = users.map(user => user.name.split(" ")[0])
    console.log(userLabels)
    const dataItem = {
      labels: userLabels,
      datasets: [{
          data: itemResume,
          backgroundColor: ['#FF6384', '#36A2EB','#4ac0c0','#fece56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB','#4ac0c0','#fece56']
      }]
  };
  const dataTask = {
    labels: userLabels,
    datasets: [{
        data: taskResume,
        backgroundColor: ['#FFCE56', '#36A2EB','#4ac0c0','#fece56'],
        hoverBackgroundColor: ['#FFCE56', '#36A2EB','#4ac0c0','#fece56']
    }]
};
const dataRoom = {
  labels: userLabels,
  datasets: [{
      data: roomResume,
      backgroundColor: ['#FF6384', '#36A2EB','#4ac0c0','#fece56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB','#4ac0c0','#fece56']
  }]
};

    return (
      <div>
      <div className="summary">
      <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <h1 style={props} >Summary</h1>}
          </Spring>
          <div className="SummaryWrapper">
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={6}>
            {this.state.itemResume && this.state.itemResume.length > 0 && (<Doughnut data={dataItem} legend={{display: false}} width={200} height={200}/>)}
            <h2>Items</h2>
            <h3>{"BestUser"}</h3>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
            {this.state.taskResume.length && (<Doughnut data={dataTask} legend={{display: false}} width={200} height={200}/>)}
            <h2>Tasks</h2>
            <h3>123 times</h3>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
            {this.state.roomResume.length && (<Doughnut data={dataRoom} legend={{display: false}} width={200} height={200}/>)}
            <h2>Rooms</h2>
            <h3>123 times</h3>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          </div>
        <div className="timeline">
        <Timeline>
        {this.state.log &&  (this.state.log.map(item => (
          <Timeline.Item key={item._id} dot={<Icon  size="lg" icon="circle" style={{ color: 'gray' }} />}>
          <h3><span><Icon size="lg" icon="check-square-o" /></span> {item.name}</h3>
          <p>{item.state}</p>
          </Timeline.Item>
        )))}
        </Timeline>
        </div>
      </div>
      <NavBar/>
      </div>

    )
  }
}

export default withAuthConsumer(HomeSummary)