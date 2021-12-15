import React from "react";

export const Result = (props) => {
  let alternatives;
  if (props.result.expected && props.result.expected.length !== 0) {
    alternatives = props.result.expected.map((element, index) => {
      if (index < props.result.expected.length - 1) {
        return <span key={`alternative-term-${index}`}>{element}, </span>;
      } else {
        return <span key={`alternative-term-${index}`}>{element}</span>;
      }
    });
  }

  let reason;
  if (props.result.note) {
    reason = props.result.note;
  } else if (props.result.reason) {
    reason = props.result.reason;
  }

  return (
      <div>
        <p>Term: {props.result.actual}</p>
        {alternatives ? <p>Alternatives: {alternatives}</p>:<p>Alternatives: No alternatives to suggest</p>}
        {reason ? <p>Reason: {reason}</p> : null}
        {/* <p>{JSON.stringify(props.result)}</p> */} 
      </div>
  );
};