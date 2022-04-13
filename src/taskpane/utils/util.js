import { unified } from 'unified'
import retextEnglish from 'retext-english'
import retextEquality from 'retext-equality'
import retextStringify from 'retext-stringify'
import retextProfanities from 'retext-profanities'

export const getTerms = (bodyText) => {
    //TODO add additional MSFT library of terms to scan against
    if (bodyText === "") {
        return "emptyBody";
    }
    let results;
    //Compares inputted text against npm libraries of known terms
    try {
        unified()
            .use(retextEnglish)
            .use(retextEquality)
            .use(retextProfanities)
            .use(retextStringify)
            .process(bodyText, function (err, file) {
                results = file;
            });
    }
    catch (err) {
        console.log("Error : " + err)
    }
    if (results.messages[0] === undefined) {
        //Text not identified as non-inclusive
        return null;
    } else {
        //Found non inclusive terms in text
        // return object of terms,alternatives, and reason
        return results.messages;
    }
};