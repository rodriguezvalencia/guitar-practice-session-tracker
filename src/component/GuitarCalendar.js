import React from "react";
import Calendar from 'react-calendar'
//import {Button, Modal} from 'react-bootstrap';
import ExerciseModal from "./ExerciseModal";
import 'react-calendar/dist/Calendar.css';
import './GuitarCalendar.css';

function retrieveTrainingHistory() {
  var history = localStorage.getItem('history')?new Map(JSON.parse(localStorage.getItem('history'))):new Map();
  return history;
}

export default class GuitarCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: retrieveTrainingHistory(),
      modalDate: new Date().toDateString(),
      showExerciseModal: false,
    };
    this.exerciseModal = React.createRef();
  }

  doShowModal = (childState) => {
    this.exerciseModal.current.triggerModal();
  }

  definePractice = (practice, date) => {
    this.setPractice(practice,date);
  }

  handleClose() {
    this.props.parentCallback({show: false});
  }

  handleOpen(day) {
    this.exerciseModal.current.triggerModal(
      {show: true,
       modalDate: day.toDateString()}
    );
  }

  setPractice(practice, date) {
    var newHistory = new Map(this.state.history); //Shallow copy is OK
    newHistory.set(date, practice);
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
        <ExerciseModal ref={this.exerciseModal} definePractice={this.definePractice} />
      </div>
    );
  }
}

function tileDisabled({date, view}) {
  return date > new Date();
}

function practiceTile({ date, view }, history) {
  var tileDate = new Date(date);
  var tileClasses = ['custom-tile'];
  if (tileDate.getMonth() !== new Date().getMonth()) {
    tileClasses.push('tile-previous-month');
  }
  const dateString = tileDate.toDateString();
  if (history.has(dateString) && history.get(dateString) === false) {
    tileClasses.push('tile-with-no-practice');
  } else if (history.has(dateString) && history.get(tileDate.toDateString()) !== false) {
    tileClasses.push('tile-with-practice');
  }
  return tileClasses;
}
