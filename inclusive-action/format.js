import { relative } from "path"

export function formatResponse(checkRes) {
    let header = `# Inclusive Terms Report\n Please make the following language changes.\n`
    let success = `### :sparkles: :rocket: :sparkles: 0 Non-Inclusive Terms Found :sparkles: :rocket: :sparkles:`
    
    let sections = checkRes.map(res => formatFileTable(res))

    if (sections.every(section => section === '') || sections.length == 0) {
        console.log("No Terms found")
        return `${header}${success}`
    } else {
        console.log("terms found");
        return `${header}${sections.join('\n')}`
    }
}

function formatFileTable(res) {
    // don't post anything for files that are good
    console.log("FORMAT TABLE"+ res.result)
    if (res.result === "No Non-Inclusive Terms Found") {
        return ''
    }

    let filePath = relative('/github/workspace', res.filePath)
    let header = `### ${filePath}\n`
    let tableHeader = `| Term | Alternatives | Reason | \n| :---: | :---: | :---: | \n`

    let rows = res.result.map(item => formatRow(item))

    return `${header}${tableHeader}${rows.join('\n')}\n`
}

function formatRow(item) {
    return `| ${item.word} | ${item.alternatives} | ${item.reason} |`
}