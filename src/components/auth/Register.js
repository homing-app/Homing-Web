import React, { Component } from 'react'
import { Redirect,Link } from 'react-router-dom';
import { Panel, FlexboxGrid, Schema, Form, FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, Button } from 'rsuite';
import AuthService from '../../services/AuthService';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  email: StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.'),
  verifyPassword: StringType()
    .addRule((value, data) => {
      console.log(data);
      if (value !== data.password) {
        return false;
      }
      return true;
    }, 'The two passwords do not match')
    .isRequired('This field is required.')
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: '',
        email: '',
        password: '',
        verifyPassword: ''
      },
      formError: {},
      toLogin: false
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
    AuthService.register(formValue)
    .then(
      (user) => this.setState({
        toLogin: true
      }), (error) => console.error(error)
    )
  }

  handleCheckEmail() {
    this.form.checkForField('email', checkResult => {
      console.log(checkResult);
    });
  }

  render() {

    const { formValue, toLogin } = this.state;

    if(toLogin) {
      return(<Redirect to="/login"/>)
    }

    return (
      <div className="registerPage">
        <div>
          
        </div>
      <div className="registerForm">
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={20}>
        <h1>Register</h1>
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
              <TextField name="name" label="Name" />
              <TextField name="email" label="Email" />
              <TextField name="password" label="Password" type="password" />
              <TextField name="verifyPassword" label="Verify password" type="password"/>

              <ButtonToolbar>
                <Button appearance="primary" onClick={this.handleSubmit} block> Submit </Button>
              </ButtonToolbar>
            </Form>
          </Panel>
          <h6>Have you an account? <Link to="/login">Login</Link></h6>
        </FlexboxGrid.Item>
        
      </FlexboxGrid>
      </div>
      </div>
    );
  }
}

export default Register