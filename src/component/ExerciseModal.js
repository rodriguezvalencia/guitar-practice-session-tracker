import React from "react";
import {Button, Modal} from 'react-bootstrap';


export default class ExerciseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      date: this.props.date
    };
  }

  state = {
    show: false
  };

  triggerModal = (modalParams) => {
    this.setState({show: modalParams.show, date: modalParams.modalDate});
  }

  savePractice = (practice) => {
    this.props.definePractice(practice, this.state.date);
  }

  setNoPractice = () => {this.savePractice(false);}
  setPractice = () => {this.savePractice(true);}

  handleClose = () => {
    this.setState({show: false});
  }

  render() {
   return (
        <>
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Did you exercise on {this.state.date} day</Modal.Body>
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
    );
  }

}