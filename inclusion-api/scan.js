import { unified } from 'unified'
import retextEnglish from 'retext-english'
import retextEquality from 'retext-equality'
import retextStringify from 'retext-stringify'
import retextProfanities from 'retext-profanities'
import poliCheckObj from './PoliCheckTerms.json' assert {type: 'json'};

export default function scan(bodyText, poliCheck, profanities, inclusion) {
    
    let unifiedResults = scanUnified(bodyText, profanities, inclusion);
    let poliCheckResults = poliCheck ? scanPoli(bodyText) : null;

    return combineResults(unifiedResults, poliCheckResults);
}

function scanUnified(bodyText, profanities, inclusion) {
    let unifiedResults;
    //Compares inputted text against npm libraries of known terms
    try {

        if (profanities && inclusion) {
            unified()
                .use(retextEnglish)
                .use(retextEquality)
                .use(retextProfanities)
                .use(retextStringify)
                .process(bodyText.toLowerCase(), function (err, file) {
                    unifiedResults = file;
                });
        }
        else if (profanities) {
            unified()
                .use(retextEnglish)
                .use(retextProfanities)
                .use(retextStringify)
                .process(bodyText.toLowerCase(), function (err, file) {
                    unifiedResults = file;
                });
        }
        else if (inclusion) {
            unified()
                .use(retextEnglish)
                .use(retextEquality)
                .use(retextStringify)
                .process(bodyText.toLowerCase(), function (err, file) {
                    unifiedResults = file;
                });
        }
        else {
            unifiedResults = null;
        }
    }
    catch (err) {
        console.log("Error : " + err)
    }
    if (unifiedResults.messages[0] === undefined) {
        //Text not identified as non-inclusive
        return null;
    } else {
        //Found non inclusive terms in text
        //console.log(results.messages);
        let arr = unifiedResults.messages.filter((value, index, self) =>
            index === self.findIndex((temp) => (
                temp.actual === value.actual
            ))
        )

        let returnObj = [];
        arr.forEach((item, index) => {
            let reason;
            if (item.note) {
                reason = item.note;
            } else if (item.reason) {
                reason = item.reason;
            }

            let tempObj = {
                "word": item.actual,
                "alternatives": item.expected,
                "reason": reason,
                "source": "UnifiedLib"
            }
            returnObj.push(tempObj)
        })
        return returnObj;
    }
}

function scanPoli(bodyText) {
    let returnObj = [];
    //Parse bodyText
    let bodyArray = bodyText.split(" ");
    //for each item in body text check if contained in json 
    //TODO: Implement Policheck text scanner functionality 
    bodyArray.forEach((word) => {
        console.log(word, typeof (word));
        poliCheckObj.TermsList.forEach((termObj) => {
            if (word.includes(termObj.Term)) {
                let reason = termObj.Why;
                if(termObj.Why.indexOf('\r')>0){
                    reason = termObj.Why.substring(0, termObj.Why.indexOf('\r'))
                }
                let tempObj = {
                    "word": word,
                    "alternatives": termObj.ActionRecommendation,
                    "reason": reason,
                    "source": "PoliCheck"
                }
                returnObj.push(tempObj);
            }

        })

    });
    if (returnObj.length == 0) return null;

    return returnObj;
}

function combineResults(unifiedResults, poliCheckResults) {


    if (unifiedResults == null) {
        return poliCheckResults;
    }
    else if (poliCheckResults == null) {
        return unifiedResults;
    }
    else {
        poliCheckResults.forEach(poliElement => {
            let found = false;
            unifiedResults.forEach(unifiedElement => {
                if (unifiedElement.word == poliElement.word) {
                    found = true;
                    return;
                }
            });

            if (!found) {
                unifiedResults.push(poliElement);
            }
        })
        return unifiedResults;
    }
}