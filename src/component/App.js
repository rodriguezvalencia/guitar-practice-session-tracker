import React from "react";
import GuitarCalendar from "./GuitarCalendar";
import Header from "./Header";
import {Container, Row, Col} from 'react-bootstrap';
import "./App.css";

export default class App extends React.Component {

  render() {
    return (
      <div className="component-app">
        <Header />
        <Container className="main-container">
          <Row className="main-row">
            <Col xs={9} className="sidebar-sticky cal-column"><GuitarCalendar parentCallback = {this.doShowModal} /></Col>
            <Col>Practice</Col>
          </Row>
        </Container>
      </div>
    );
  }
}