import React from "react";
import {Nav, Navbar} from 'react-bootstrap';

export default class Header extends React.Component {
  render () {
    return (<Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">Guitar practice calendar</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#about">About</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>);
  }
}