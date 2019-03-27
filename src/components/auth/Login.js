import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Panel, FlexboxGrid, Schema, Form, FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, Button } from 'rsuite';
import AuthService from '../../services/AuthService';

const { StringType } = Schema.Types;

const model = Schema.Model({
  email: StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.'),
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        email: '',
        password: ''
      },
      formError: {},
      toMain: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckEmail = this.handleCheckEmail.bind(this);
  }

  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
    AuthService.authenticate(formValue)
    .then(
      (user) => this.setState({
        toMain: true
      }), (error) => console.error(error)
    )
  }

  handleCheckEmail() {
    this.form.checkForField('email', checkResult => {
      console.log(checkResult);
    });
  }

  render() {

    const { formValue, toMain } = this.state;

    if(toMain) {
      return(<Redirect to="/"/>)
    }

    return (
      <div className="loginPage">
        <div>
          
        </div>
      <div className="loginForm">
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={20}>
        <h1>Login</h1>
          <Panel bordered>

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
              <TextField name="email" label="Email" />
              <TextField name="password" label="Password" type="password" />

              <ButtonToolbar>
                <Button color="violet" appearance="primary" onClick={this.handleSubmit} block> Login </Button>
              </ButtonToolbar>
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      </div>
      </div>
    );
  }
}

export default Login