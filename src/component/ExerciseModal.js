import React from "react";
import Calendar from 'react-calendar'
import {Container, Row, Col, Button, Modal, Nav, Navbar, NavDropdown} from 'react-bootstrap';

export default class ExerciseModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
   return (
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
    );
  }

}