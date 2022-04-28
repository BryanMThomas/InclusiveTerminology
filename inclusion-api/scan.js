import { unified } from 'unified'
import retextEnglish from 'retext-english'
import retextEquality from 'retext-equality'
import retextStringify from 'retext-stringify'
import retextProfanities from 'retext-profanities'

export default function scan(bodyText) {
    //TODO add additional MSFT library of terms to scan against
    let results;
    //Compares inputted text against npm libraries of known terms
    try {
        unified()
            .use(retextEnglish)
            .use(retextEquality)
            .use(retextProfanities)
            .use(retextStringify)
            .process(bodyText.toLowerCase(), function (err, file) {
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
        //console.log(results.messages);
        let arr = results.messages.filter((value, index, self) =>
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
                "reason": reason
            }
            returnObj.push(tempObj)
        })
        return returnObj;
    }
}
