import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: grey;
  }
  .navbar-brand{
    color: #efefef;
    font-size: 2.2em;
    &:hover {
      color: black;
    }
  }
  .navbar-nav .nav-link {
    color: #efefef;
    font-size: 1.8em;
    &:hover {
      color: black;
    }
  }
`;
export const NavigationBar = () => {
  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="/">Inclusive Thesaurus</Navbar.Brand>
        <Navbar.Toggle aria-controls= "basic-navbar-nav"/>
        <Navbar.Collapse id = "basic-navbar-nav">
            <Nav className = "ml-auto">
                <Nav.Item><Nav.Link href ="/">Search</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href ="/About">About</Nav.Link></Nav.Item>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};
