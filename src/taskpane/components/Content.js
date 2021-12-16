import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { scanBody } from "../utils/util";
import { Results } from "./Results/Results";
import Header from "./Header";

export const Content = () => {
    let [termsData, setTermsData] = useState({});
    
    const getBody = () => {
        Office.context.mailbox.item.body.getAsync(
            "text",
            { asyncContext: "This is passed to the callback" },
            function callback(result) {
                // Passes the text of the composed email to the scanner function
                console.log(result.value);
                let trimmedText = result.value.replace(/(\s+)/gi, " ");
                setTermsData(scanBody(trimmedText));
            });
    };
    
    return (
        <Container>
            <div>
                <Header logo={require("./../../../assets/heart-person.png")} title="Inclusion Checker" message="Welcome to Inclusion Checker" />
                <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20"> A tool to help you write more inclusive communications"</h2>
                <p className="ms-font-l">
                    Write your email and then hit <b>Run</b>.
                </p>
                <div role="button" id="run" class="ms-welcome__action ms-Button ms-Button--hero ms-font-xl" onClick={() => {
                    getBody();
                }}>
                    <span className="ms-Button-label">Run</span>
                </div>
                <Results termsData={termsData} setTermsData={setTermsData} />
            </div>
        </Container>
    );
};