import React from "react";
import { Result } from "./Result/Result";


export const Results = (props) => {
  if (props.termsData === null) {
    return (
      <div>
        <h3>No issues found with this email</h3>
      </div>
    );
  } else if (
    props.termsData === "emptyBody" ||
    props.termsData.length === undefined
  ) {
    //initial load or searched for empty string
    return null;
  } else {
    return (
      <div>
        <h3>Found Non-Inclusive Terms</h3>
        {props.termsData.map((element, index) => (
          <Result result={element} key={`result-${index}`} />
        ))}
      </div>
    );
  }
};