import React from "react";
import { Result } from "./Result/Result";


export const Results = (props) => {
  if (props.resultsData === null) {
    return (
      <div>
        <h3>No issues found with this email</h3>
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
      <div>
        <h3>Found Non-Inclusive Terms</h3>
        {props.resultsData.map((element, index) => (
          <Result result={element} key={`result-${index}`} />
        ))}
      </div>
    );
  }
};