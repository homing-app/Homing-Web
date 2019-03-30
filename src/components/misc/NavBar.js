import React from 'react';
import { Container, Header, Content, FlexboxGrid, Nav, Icon } from 'rsuite';
import { withAuthConsumer } from '../../contexts/AuthStore'

const NavBar = ({ user }) => (
  <div className="navBar">
      <Nav appearance="subtle">
      <FlexboxGrid justify="space-around" >
      <FlexboxGrid.Item><Nav.Item href="/">{<Icon className="navHomeIcon" size="2x" icon="square-o"/>}</Nav.Item></FlexboxGrid.Item>
      <FlexboxGrid.Item><Nav.Item href={`${user.id}/details`}>{<Icon className="navUserIcon" size="2x" icon="circle-thin"/>}</Nav.Item></FlexboxGrid.Item>
      <FlexboxGrid.Item><Nav.Item >{<Icon className="navListIcon" size="2x" icon="task"/>}</Nav.Item></FlexboxGrid.Item>
      <FlexboxGrid.Item><Nav.Item >{<Icon className="navGearIcon" size="2x" icon="gear"/>}</Nav.Item></FlexboxGrid.Item>
      </FlexboxGrid>
      </Nav>

  </div>
)

export default withAuthConsumer(NavBar)
