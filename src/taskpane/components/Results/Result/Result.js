import React from "react";

const replaceTerm = (term, alternatives) => {
  console.log("REPLACE TERM")
  let body;
  Office.context.mailbox.item.body.getAsync(
    "text",
    { asyncContext: "This is passed to the callback" },
    function callback(result) {
      // Passes the text of the composed email to the scanner function
      const regexPattern = new RegExp(term, 'gmi');
      body = result.value.replace(regexPattern, alternatives[0])
      console.log(alternatives[0])
      console.log(body);
      Office.context.mailbox.item.body.setAsync(body, function callback(result) {
        console.log(result.value)
      })
    }
  )
}

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
      {alternatives ? <p>Alternatives: {alternatives}</p> : <p>Alternatives: No alternatives to suggest</p>}
      {reason ? <p>Reason: {reason}</p> : null}
      <button onClick={() => { replaceTerm(props.result.actual, props.result.expected) }}>Replace</button>
    </div>
  );
};