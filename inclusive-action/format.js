import { relative } from "path"

function formatResponse(checkRes) {
    let header = `# Inclusive Terms Report\n Please make the following language changes.\n`
    let success = `### :sparkles: :rocket: :sparkles: 0 Non-Inclusive Terms Found :sparkles: :rocket: :sparkles:`

    let sections = checkRes.map(res => formatFileTable(res))

    if (sections.every(section => section === '') || sections.length == 0) {
        return `${header}${success}`
    } else {
        return `${header}${sections.join('\n')}`
    }

}

function formatFileTable(res) {
    // don't post anything for files that are good
    if (res.result.length == 0) {
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

export default { formatResponse }