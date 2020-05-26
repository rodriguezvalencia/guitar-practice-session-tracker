import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar'

import {Container, Row, Col, Button, Modal, Nav, Navbar, NavDropdown} from 'react-bootstrap';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';

import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function retrieveTrainingHistory() {
  var history = localStorage.getItem('history')?new Map(JSON.parse(localStorage.getItem('history'))):new Map();
  var today = new Date();
  return history;
}

class Header extends React.Component {
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

class Columns extends React.Component {
  render () {
    return (<Container>
      <Row>
        <Col xs={3} className="sidebar-sticky cal-column"><Practice /></Col>
        <Col>Practice</Col>
      </Row>
    </Container>);
  }
}

class Practice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: retrieveTrainingHistory(),
      show: false,
      modalDate: new Date().toDateString(),
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleOpen(day) {
    this.setState(
      {show: true,
       modalDate: day.toDateString()}
    );
  }

  setNoPractice() {
    var newHistory = new Map(this.state.history); //Shallow copy is OK
    newHistory.set(this.state.modalDate, false);
    this.setState(
      {history: newHistory}
    );
    localStorage.setItem('history', JSON.stringify([...newHistory]));
  }

  setPractice() {
    var newHistory = new Map(this.state.history); //Shallow copy is OK
    newHistory.set(this.state.modalDate, true);
    this.setState(
      {history: newHistory}
    );
    localStorage.setItem('history', JSON.stringify([...newHistory]));
  }

  render() {
   return (
      <div>
        <Calendar
          onClickDay={(value) => this.handleOpen(value)}
          className='daily-cal'
          tileClassName={({ date, view }, history) => practiceTile({ date, view }, this.state.history)}
          tileDisabled={tileDisabled}
        />
        <>
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Did you exercise on {this.state.modalDate}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {this.setNoPractice();this.handleClose()}}>
                No
              </Button>
              <Button variant="primary" onClick={() => {this.setPractice();this.handleClose()}}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
}

function tileDisabled({date, view}) {
  return date > new Date();
}

function practiceTile({ date, view }, history) {
  var tileDate = new Date(date);
  var tileClasses = [];
  if (tileDate.getMonth() !== new Date().getMonth()) {
    tileClasses.push('tile-previous-month');
  }
  console.log(history);
  console.log(typeof history);
  if (history.get(tileDate.toDateString()) === true) {
    tileClasses.push('tile-with-practice');
  } else if (history.get(tileDate.toDateString()) === false) {
    tileClasses.push('tile-with-no-practice');
  }
  return tileClasses;
}

// ========================================
ReactDOM.render(
  <>
    <Header />
    <Columns />
  </>,
  document.getElementById('root')
);

