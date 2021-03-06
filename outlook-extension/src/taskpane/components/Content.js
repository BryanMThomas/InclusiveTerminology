import React, { useState } from "react";
import { scanText } from "../../util/util";
import { Results } from "./Results/Results";
import Header from "./Header";

export const Content = () => {
    let [termsData, setTermsData] = useState({});
    let [runState, setRunState] = useState({ text: "Run" });

    const getBody = () => {
        Office.context.mailbox.item.body.getAsync(
            "text",
            { asyncContext: "This is passed to the callback" },
            function callback(result) {
                // Passes the text of the composed email to the scanner function
                console.log(result.value);
                let trimmedText = result.value.replace(/(\s+)/gi, " ");
                scanText(trimmedText).then((response)=>{
                    console.log(response.data)
                    if(response.status !== 200){
                        //TODO handle unsuccessful paths
                        console.log("Unsuccessful Scan Call")
                    }
                    else{
                        if(response.data.result === "No Non-Inclusive Terms Found"){
                            setTermsData(null)
                        }
                        else{
                            setTermsData(response.data.result)
                        }
                    }
                })
                
            });
    };

    return (
        <div >
            <Header logo={require("./../../../assets/heart-person.png")} title="Inclusion Checker" message="Welcome to Inclusion Checker" />
            <div className="container">
                <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20"> A tool to help you write more inclusive communications</h2>
                <p className="ms-font-l">
                    Write your email and then hit <b>Run</b>.
                </p>
                <div role="button" id="run" className="primary-button button" onClick={() => {
                    setRunState({ text: "Re-Run" })
                    getBody();

                }}>
                    <span className="ms-Button-label">{runState.text}</span>
                </div>
                <Results termsData={termsData} setTermsData={setTermsData} />
            </div>
        </div>
    );
};