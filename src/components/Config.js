import React, { Component } from 'react'
import NavBar from './misc/NavBar'
import { Redirect } from 'react-router-dom';
import { withAuthConsumer } from '../contexts/AuthStore'
import { Spring } from 'react-spring/renderprops'
import { Input, Tag, TagGroup, Divider, Uploader, Icon, Panel, FlexboxGrid, Schema, Form, FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, Button } from 'rsuite';
import UserService from '../services/UserService';
import HomeService from '../services/HomeService';
import RoomService from '../services/RoomService';
import InfoService from '../services/InfoService';


const { StringType } = Schema.Types;

const userModel = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.').minLength(6, 'The field cannot be less than 6 characters'),
  phone: StringType().isRequired('This field is required.').minLength(9, 'The field cannot be less than 6 characters').maxLength(9, 'The field cannot be less than 6 characters'),
  verifyPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, 'The two passwords do not match')
    .isRequired('This field is required.')
});
const homeModel = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});
const roomModel = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});
const infoModel = Schema.Model({
  title: StringType().isRequired('This field is required.'),
});


class TextField extends React.PureComponent {
  render() {
    const { name, message, label, accepter, ...props } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label} </ControlLabel>
        <FormControl name={name} accepter={accepter} {...props} />
        <HelpBlock>{message}</HelpBlock>
      </FormGroup>
    );
  }
}

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formUser: {
        name: this.props.user.name,
        email: this.props.user.email,
        password: "",
        phone: "",
        verifyPassword: '',
        attachment: "",
      },
      formUserError: {},
      formHome: {
        name: "",
        attachment: "",
        homeCode: ""
      },
      formRoom: {
        name: "",
        home: this.props.user.home
      },
      formInfo: {
        title: "",
        description: "",
        home: this.props.user.home
      },
      formHomeError: {},
      formRoomError: {},
      formInfoError: {},
      rooms: [],
      info:[],
      users: [],
      logout: false,
      toLogin: false
    };
    this.handleSubmitUser = this.handleSubmitUser.bind(this);
    this.handleSubmitHome = this.handleSubmitHome.bind(this);
    this.handleSubmitRoom = this.handleSubmitRoom.bind(this);
    this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
    this.handleChangeImageUser = this.handleChangeImageUser.bind(this)
    this.handleChangeImageHome = this.handleChangeImageHome.bind(this)
  }

  handleSubmitUser() {
    const { formUser } = this.state;
    const id = this.props.user.id
    // if (!this.form.check()) {
    //   console.error('Form Error');
    //   return;
    // }
    UserService.edit(formUser, id)
    .then(
      (user) => console.log("entra en el SubmitUser" ), (error) => console.error(error)
    )
  }

  handleSubmitHome() {
    const { formHome } = this.state;
    const id = this.props.user.home
    // if (!this.form.check()) {
    //   console.error('Form Error');
    //   return;
    // }
    HomeService.edit(formHome, id)
    .then(
      (home) => console.log("entra en el SubmitHome"), (error) => console.error(error)
    )
  }

  handleSubmitRoom() {
    const { formRoom } = this.state;
    // if (!this.form.check()) {
    //   console.error('Form Error');
    //   return;
    // }
    RoomService.create(formRoom)
    .then(
      (room) => this.setState({ rooms: [ ...this.state.rooms, room] })
    , (error) => console.error(error)
    )
  }

  handleSubmitInfo() {
    const { formInfo } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    InfoService.create(formInfo)
    .then(
      (item) => this.setState({ info: [ ...this.state.info, item] })
    ,(error) => console.error(error)
    )
  }

  handleChangeImageUser(files) {
    let formUser = this.state.formUser
    formUser = {...formUser, attachment: files[0].blobFile}
    this.setState({ formUser })
  }

  handleChangeImageHome(files) {
    let formHome = this.state.formHome
    console.log(files)
    formHome = {...formHome, attachment: files[0].blobFile}
    this.setState({ formHome })
  }

  handleInfoRemove(tag) {
    const { info } = this.state;
    const nextInfo = info.filter(item => item._id !== tag._id);
    this.setState({
      info: nextInfo
    },() => InfoService.remove(tag._id));
  }

  handleUserRemove(user) {
    console.log(user)
    const { users } = this.state;
    const nextusers = users.filter(item => item.id !== user.id);

    this.setState({
      users: nextusers
    },() => UserService.remove(user.id));
  }

  handleRoomRemove(tag) {
    const { rooms } = this.state;
    const nextRooms = rooms.filter(item => item._id !== tag._id);
    this.setState({
      rooms: nextRooms
    }, () => RoomService.remove(tag._id));
  }

  getDetails = () => {
    HomeService.details(this.props.user.home)
    .then(response => {
      this.setState({
        formHome: {
          name: response.name,
          attachment: response.attachment,
          homeCode: response.homeCode
        },
        rooms: response.rooms,
        info: response.info,
        users: response.users,
        
      });
    }, error => {this.setState({toLogin : true})})
  }

  componentDidMount = () => {
    this.getDetails()
    console.log(this)
  }

  handleInputChange(inputValue) {
    this.setState({ inputValue });
  }

  userLogout = () =>{
    this.setState({logout: true}, () => UserService.logout() )
  }


  render() {

    const { formUser, formHome, formRoom, formInfo, info, rooms, users, logout  } = this.state;

    if(this.state.toLogin) {
      return(<Redirect to="/login"/>)
    }

    if(logout) {
      return(<Redirect to={`/login`}/>)
    }

    return (
      <div className="registerPage config">
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}>
        {props => <h1 className="mainh1">Config</h1>}
      </Spring>
      <div>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={20}>
        <h1>Edit Profile</h1>
          <Panel bordered>
            <Form
              ref={ref => (this.form = ref)}
              onChange={formUser => {
                this.setState({ formUser });
              }}
              onCheck={formUserError => {
                this.setState({ formUserError });
              }}
              formValue={formUser}
              model={userModel}
              >
              <FlexboxGrid justify="center">
                <Uploader  multiple={false} autoUpload={false} listType="picture" onChange={this.handleChangeImageUser}>
                  <button>
                    <Icon icon='camera-retro' size="lg" />
                  </button>
                </Uploader>
              </FlexboxGrid>
              <TextField name="name" label="Name" />
              <TextField disabled name="email" label="Email"/>
              <TextField name="phone" label="Phone number" />
              <TextField name="password" label="New Password" type="password" />
              <TextField name="verifyPassword" label="Verify password" type="password"/>
              <ButtonToolbar>
                <Button appearance="primary" onClick={this.handleSubmitUser} block> Submit </Button>
              </ButtonToolbar>
            </Form>
            <Divider />
            <ButtonToolbar>
                <Button color="red" onClick={this.userLogout} block> Logout </Button>
              </ButtonToolbar>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      </div>
      <div>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={20}>
        <h1>Edit Home</h1>
          <Panel bordered>
            <Form
              ref={ref => (this.form = ref)}
              onChange={formHome => {
                this.setState({ formHome });
              }}
              onCheck={formHomeError => {
                this.setState({ formHomeError });
              }}
              formValue={formHome}
              model={homeModel}
              >
              <FlexboxGrid justify="center">
                <Uploader multiple={false} autoUpload={false} listType="picture" onChange={this.handleChangeImageHome}>
                  <button>
                    <Icon icon='camera-retro' size="lg" />
                  </button>
                </Uploader>
              </FlexboxGrid>
              <TextField name="name" label="Home name" />
              <TextField disabled name="homeCode" label="homeCode"/>
              <ButtonToolbar>
                <Button appearance="primary" onClick={this.handleSubmitHome} block> Submit </Button>
              </ButtonToolbar>
            </Form>
            <Divider />
            <h3>Rooms</h3>
              <TagGroup className="itemMap">
              {rooms.length && rooms.map((room) => (<Tag key={room._id} closable onClose={() => this.handleRoomRemove(room)}>{room.name}</Tag>))}
              </TagGroup>
              <Panel header={<h3>Add rooms</h3>} bordered collapsible>
              <Form
              ref={ref => (this.form = ref)}
              onChange={formRoom => {
                this.setState({ formRoom });
              }}
              onCheck={formRoomError => {
                this.setState({ formRoomError });
              }}
              formValue={formRoom}
              model={roomModel}
              >
              <TextField name="name" label="name" placeholder="room name"/>
              <ButtonToolbar>
                <Button appearance="primary"  onClick={this.handleSubmitRoom} block> Add a room </Button>
              </ButtonToolbar>
            </Form>
            </Panel>
            <Divider />
            <h3>Info</h3>
              <TagGroup className="itemMap">
              {info.length && info.map((item) => (<Tag key={item._id} closable onClose={() => this.handleInfoRemove(item)}>{item.title}</Tag>))}
              </TagGroup>
              <Panel header={<h3>Add info</h3>} bordered collapsible>
                <Form
                  ref={ref => (this.form = ref)}
                  onChange={formInfo => {
                    this.setState({ formInfo });
                  }}
                  onCheck={formInfoError => {
                    this.setState({ formInfoError });
                  }}
                  formValue={formInfo}
                  model={infoModel}
                  >
                  <TextField name="title" label="title" placeholder="info title"/>
                  <TextField name="description" label="description" placeholder="info description"/>
                  <ButtonToolbar>
                    <Button appearance="primary" onClick={this.handleSubmitInfo} block> Add info </Button>
                  </ButtonToolbar>
                </Form>
              </Panel>
              <h3>Users</h3>
              <TagGroup className="itemMap">
              {users.length && users.map((user) => (<Tag key={user.id} closable onClose={() => this.handleUserRemove(user)}>{user.name}</Tag>))}
              </TagGroup>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      </div>
      <NavBar/>
      </div>
    );
  }
}

export default withAuthConsumer(Config)


