import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import styled from "styled-components";
import { checkTerms } from "../../util/util";
import { Results } from "./Results/Results";

const Styles = styled.div`
  div {
    margin-top: 45px;
  }
`;

export const Search = () => {
  let [resultsData, setResultsData] = useState({});
  let [inputVal, setInputVal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    checkTerms(inputVal).then((response) => {
      setResultsData(response.data.result);
    });
  };

  return (
    <Container>
      <Styles>
        <div>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group controlId="textSearch">
              <Form.Control
                onChange={(event) => setInputVal(event.target.value)}
                name="searchForm"
                className="searchForm"
                size="lg"
                type="text"
                placeholder="Enter a single term or space separated set of terms"
              />
            </Form.Group>
            <Button
              className="searchButton"
              size="lg"
              variant="primary"
              type="submit"
            >
              Search
            </Button>
          </Form>
          <Results resultsData={resultsData} setResultsData={setResultsData} />
        </div>
      </Styles>
    </Container>
  );
};
