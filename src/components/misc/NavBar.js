import React from 'react';
import { Container, Header, Content, FlexboxGrid, Nav, Navbar, Footer, Icon } from 'rsuite';

const NavBar = () => (
  <div className="show-container">
  <Header>HOLITA</Header>
  <Content>blablabla</Content>
    <Footer>
      <Nav>
        <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
        <Nav.Item>News</Nav.Item>
        <Nav.Item>Solutions</Nav.Item>
        <Nav.Item>Products</Nav.Item>
        <Nav.Item>About</Nav.Item>
      </Nav>
    </Footer>
  </div>
)

export default NavBar
