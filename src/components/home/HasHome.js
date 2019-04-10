import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Toggle, Panel, FlexboxGrid, Schema, Form, FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, Button } from 'rsuite';
import { withAuthConsumer } from '../../contexts/AuthStore'
import UserService from '../../services/UserService';
import HomeService from '../../services/HomeService';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  email: StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
});

const codeModel = Schema.Model({
  homeCode: StringType().isRequired('This field is required.'),
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

class HasHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: '',
        email: this.props.user.email
      },
      formCode: {
        id: this.props.user.id,
        homeCode: '',
      },
      formError: {},
      formCodeError: {},
      toMain: false,
      hasCode: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitHome = this.handleSubmitHome.bind(this);
    this.handleCheckEmail = this.handleCheckEmail.bind(this);
  }

  handleSubmitHome() {
    const { formCode } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    UserService.setuphome(formCode)
    .then(
      () => this.setState({
        toMain: true
      }), (error) => console.error(error)
    )
  }

  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    HomeService.register(formValue)
    .then(
      () => this.setState({
        toMain: true
      }), (error) => console.error(error)
    )
  }

  handleCheckEmail() {
    this.form.checkForField('email', checkResult => {
    });
  }

  render() {

    const { formValue, toMain, formCode } = this.state;

    if(toMain) {
      return(<Redirect to="/"/>)
    }

    return (
      <div className="hasHomePage">
        <div>
        </div>
      <div className="hasHomeForm">
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={20}>
          <Panel bordered>
          <h1>have you a home Code? <Toggle onChange={checked => this.setState({ hasCode: checked })} size="md" checkedChildren="Yes" unCheckedChildren="No" /></h1>
          { this.state.hasCode === true && (
            <Form
              ref={ref => (this.form = ref)}
              onChange={formCode => {
                this.setState({ formCode });
              }}
              onCheck={formCodeError => {
                this.setState({ formCodeError });
              }}
              formValue={formCode}
              model={codeModel}
              >
              <TextField name="homeCode" label="HomeCode" />

              <ButtonToolbar>
                <Button color="blue" appearance="primary" onClick={this.handleSubmitHome} block> Setup Home </Button>
              </ButtonToolbar>
            </Form>)}
          </Panel>
          { !this.state.hasCode === true && (
            <Panel className="paddingHome" bordered>
            <h1>Create a new home</h1>
              <Form
                ref={ref => (this.form = ref)}
                onChange={formValue => {
                  this.setState({ formValue });
                }}
                onCheck={formError => {
                  this.setState({ formError });
                }}
                formValue={formValue}
                model={model}
                >
                <TextField name="name" label="Name" />
                <TextField name="email" label="Email" />
  
                <ButtonToolbar>
                  <Button color="cyan" appearance="primary" onClick={this.handleSubmit} block> Create a home </Button>
                </ButtonToolbar>
              </Form>
            </Panel>
          )}

        </FlexboxGrid.Item>
      </FlexboxGrid>
      </div>
      </div>
    );
  }
}

export default withAuthConsumer(HasHome)