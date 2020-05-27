import React from "react";
import GuitarCalendar from "./GuitarCalendar";
import Header from "./Header";
import {Container, Row, Col} from 'react-bootstrap';
import "./App.css";

export default class App extends React.Component {
  state = {
  };


  render() {
    return (
      <div className="component-app">
        <Header />
        <Container className="main-container">
          <Row className="main-row">
            <Col xs={3} className="sidebar-sticky cal-column"><GuitarCalendar /></Col>
            <Col>Practice</Col>
          </Row>
        </Container>
      </div>
    );
  }
}