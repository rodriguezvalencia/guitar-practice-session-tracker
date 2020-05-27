import React from "react";
import Calendar from 'react-calendar'
import {Container, Row, Col, Button, Modal, Nav, Navbar, NavDropdown} from 'react-bootstrap';

import 'react-calendar/dist/Calendar.css';
import './GuitarCalendar.css';

function retrieveTrainingHistory() {
  var history = localStorage.getItem('history')?new Map(JSON.parse(localStorage.getItem('history'))):new Map();
  var today = new Date();
  return history;
}

export default class GuitarCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: retrieveTrainingHistory(),
      currentDate: new Date().toDateString(),
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleOpen(day) {
    this.setState(
      {show: true,
       currentDate: day.toDateString()}
    );
  }

  setNoPractice() {
    var newHistory = new Map(this.state.history); //Shallow copy is OK
    newHistory.set(this.state.currentDate, false);
    this.setState(
      {history: newHistory}
    );
    localStorage.setItem('history', JSON.stringify([...newHistory]));
  }

  setPractice() {
    var newHistory = new Map(this.state.history); //Shallow copy is OK
    newHistory.set(this.state.currentDate, true);
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
            <Modal.Body>Did you exercise on {this.state.currentDate}</Modal.Body>
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
  if (history.get(tileDate.toDateString()) === true) {
    tileClasses.push('tile-with-practice');
  } else if (history.get(tileDate.toDateString()) === false) {
    tileClasses.push('tile-with-no-practice');
  }
  return tileClasses;
}
