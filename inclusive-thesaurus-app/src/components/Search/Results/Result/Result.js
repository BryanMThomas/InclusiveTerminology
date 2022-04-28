import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  p {
    font-size: 1.2em;
  }
`;

export const Result = (props) => {
  let alternatives;
  if (props.result.alternatives && props.result.alternatives.length !== 0) {
    alternatives = props.result.alternatives.map((element, index) => {
      if (index < props.result.alternatives.length - 1) {
        return <span key={`alternative-term-${index}`}>{element}, </span>;
      } else {
        return <span key={`alternative-term-${index}`}>{element}</span>;
      }
    });
  }

  return (
    <Styles>
      <div>
        <p>Term: {props.result.word}</p>
        {alternatives ? (
          <p>Alternatives: {alternatives}</p>
        ) : (
          <p>Alternatives: No alternatives to suggest</p>
        )}
        {props.result.reason ? <p>Reason: {props.result.reason}</p> : null}
      </div>
    </Styles>
  );
};
