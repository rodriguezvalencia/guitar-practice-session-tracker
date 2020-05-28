import React from "react";
import {Button, Modal, Dropdown, ButtonGroup, Form} from 'react-bootstrap';


export default class ExerciseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      date: this.props.date,
      songBPM: 60
    };
  }

  triggerModal = (modalParams) => {
    this.setState({show: modalParams.show, date: modalParams.modalDate});
  }

  savePractice = (practice) => {
    this.props.definePractice(practice, this.state.date);
  }

  setNoPractice = () => {this.savePractice(false);}
  setPractice = () => {
    const practice = {
      date: this.state.date,
      songName: this.state.songName,
      songBPM: this.state.songBPM
    }
    this.savePractice(practice);
  }

  handleClose = () => {
    this.setState({show: false});
  }

  dropDownSelected = (eventKey: any, event: Object) => {
    this.setState({showExerciseForm: eventKey});
  }

  bpmRangeMove = (value: any, blah: Object) => {
    this.setState({songBPM: value.target.value})
  }

  exerciseChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
    console.log(this.state);
  }

  render() {
   return (
        <>
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>What exercise did you do on {this.state.date}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Dropdown as={ButtonGroup} onSelect={this.dropDownSelected}>
                <Button variant="success">Split Button</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item as="button" eventKey="Song">Song</Dropdown.Item>
                  <Dropdown.Item as="button" eventKey="Scales">Scales</Dropdown.Item>
                  <Dropdown.Item as="button" eventKey="Something else">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {this.state.showExerciseForm==='Song' &&
                <Form>
                  <Form.Group controlId="songName">
                    <Form.Label>Song</Form.Label>
                    <Form.Control
                      placeholder="Write the song name"
                      name="songName"
                      onChange={this.exerciseChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="songBPM">
                    <Form.Label>BPM - {this.state.songBPM}</Form.Label>
                    <Form.Control
                      value={this.state.songBPM}
                      type="range"
                      min="1"
                      max="320"
                      name="songBPM"
                      onChange={this.exerciseChange}/>
                  </Form.Group>
                </Form>
              }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {this.setNoPractice();this.handleClose()}}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => {this.setPractice();this.handleClose()}}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </>
    );
  }

}