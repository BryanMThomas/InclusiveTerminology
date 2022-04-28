import React from "react";
import styled from "styled-components";
import { Result } from "./Result/Result";

const Styles = styled.div``;

export const Results = (props) => {
  console.log("HEY",props.resultsData);

  if (props.resultsData === null || props.resultsData === "No Non-Inclusive Terms Found") {
    return (
      <div>
        <h3>No non-inclusive terms found with this search</h3>
        <p>
          If you believe this to be incorrect please consider contributing to{" "}
          <a
            href="https://github.com/retextjs/retext-equality"
            rel="noreferrer"
            target="_blank"
          >
            retext-equality
          </a>
        </p>
      </div>
    );
  } else if (
    props.resultsData === "emptySearch" ||
    props.resultsData.length === undefined
  ) {
    //initial load or searched for empty string
    return null;
  } else {
    return (
      <Styles>
        <h3>Found Non-Inclusive Terms</h3>
        {props.resultsData.map((element, index) => (
          <Result result={element} key={`result-${index}`} />
        ))}
      </Styles>
    );
  }
};
