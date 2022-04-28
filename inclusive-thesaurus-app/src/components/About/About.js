import styled from "styled-components";
import { Container } from "react-bootstrap";

const Styles = styled.div`
  margin-top: 2%;
  margin-left: 3%;
`;
export const About = () => {
  return (
    <Container>
      <Styles>
        <h2>About</h2>
        <p>
          As our language evolves so should our empathy, vocubulary, and word
          choice. The goal of this web app is to assist in the change of deeply
          embedded habits. We all can begin to consider the implications of
          words and phrases that have long gone unchallenged and unchanged. By
          using this search we can start to replace non-inclusiver terms with
          better alternatives. The list utilized by the app is by no means
          exhaustive but it gives a starting point.
        </p>
        <p>
          Thank you to the developers and contributors of the unified and retext
          packages. Please follow the link below to check out the cool work
          going on over there!
        </p>
        <span>
          <a
            href="https://github.com/unifiedjs/unified"
            rel="noreferrer"
            target="_blank"
          >
            unified
          </a>
          <span> </span>
          <a
            href="https://github.com/retextjs/retext-equality"
            rel="noreferrer"
            target="_blank"
          >
            retext-equality
          </a>
        </span>
      </Styles>
    </Container>
  );
};
