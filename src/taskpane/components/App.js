import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { DefaultButton } from "@fluentui/react";
import Header from "./Header";
import HeroList from "./HeroList";
import Progress from "./Progress";
//import { Results } from "./Results/Results";
import { scanBody } from "../utils/util.js"

/* global require */

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "Ribbon",
          primaryText: "Achieve more with Office integration",
        },
        {
          icon: "Unlock",
          primaryText: "Unlock features and functionality",
        },
        {
          icon: "Design",
          primaryText: "Create and visualize like a pro",
        },
      ],
    });
  }

  render() {
    let [termsData, setTermsData] = useState({});
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo={require("./../../../assets/heart-person.png")}
          message="Please sideload your addin to see app body."
        />
      );
    }

    return (
      <div className="ms-welcome">
        <Header logo={require("./../../../assets/heart-person.png")} title={this.props.title} message="Welcome to Inclusion Checker" />
        <HeroList message="A tool to help you write more inclusive communications" items={this.state.listItems}>
          <p className="ms-font-l">
            Write your email and then hit Run <b>Run</b>.
          </p>
          <DefaultButton className="ms-welcome__action" iconProps={{ iconName: "ChevronRight" }} onClick={() => {
            Office.context.mailbox.item.body.getAsync(
              "text",
              { asyncContext: "This is passed to the callback" },
              function callback(result) {
                // Passes the text of the composed email to the scanner function
                setTermsData(scanBody(result.value));
              });
          }}>
            Run
          </DefaultButton>
          {/* <Results termsData={termsData} setTermsData={setTermsData} /> */}
        </HeroList>
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};
