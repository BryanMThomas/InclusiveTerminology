import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .inner {
    background-color: #f8f8f8;
    border-top: 1px solid #e7e7e7;
    text-align: center;
    padding: 20px;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 60px;
    width: 100%;
  }
  .outer {
    display: block;
    padding: 20px;
    height: 60px;
    width: 100%;
  }
`;

export const Footer = () => {
  return (
    <Styles>
      <div className="outer" />
      <div className="inner">
        Created By Bryan Thomas{" "}
        <a
          href="https://github.com/BryanMThomas/inclusive-thesaurus"
          rel="noreferrer"
          target="_blank"
        >
          github
        </a>
      </div>
    </Styles>
  );
};
