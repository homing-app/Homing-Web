import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Panel, FlexboxGrid, Schema, Form, FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, Button } from 'rsuite';
import UserService from '../../services/UserService';

const { StringType } = Schema.Types;

const model = Schema.Model({
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
        homeCode: ''
      },
      formError: {},
      toMain: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
    UserService.setuphome(formValue)
    .then(
      (user) => this.setState({
        toMain: true
      }), (error) => console.error(error)
    )
  }

  render() {

    const { formValue, toMain } = this.state;

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
        <h1>You have a home Code?</h1>
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

              <ButtonToolbar>
                <Button color="cyan" appearance="primary" onClick={this.handleSubmit} block> Login </Button>
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

export default HasHome