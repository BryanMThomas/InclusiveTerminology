import { existsSync, readFileSync } from "fs-extra";
import { formatResponse } from './format';
import axios from "axios";

function generateComment(filesList) {
    //Verifies files are accessible
    const filteredFilesList = filesList.filter((value) => existsSync(value));
    //Iterate through files checking each one
    let checkRes = filteredFilesList.map(file => {
        try {
            const resp = checkFile(file)
            return { filePath: file, result: resp }
        } catch (err) {
            console.log("Error on File: ", file, " Error: ", err)
        }
    })
    //Return formatted response to comment on PR
    return formatResponse(checkRes)
}

function checkFile(file) {
    console.log(`checking ${file}`)
    const body = readFileSync(file, "utf-8");
    const fileContentsArr = body.toLowerCase().split(/\s|\n|\r|,/g);
    checkInput(body).then((response) => {
        return response.data.result;
    });
}

function checkInput(inputText) {
    return axios.post(
        "http://20.84.176.56:81/scan", { input: inputText },
        { headers: { "Content-Type": "application/json" } }
    );
};

async function createComment(github, repo, issue_number, comment) {
    const HEADER = `<!-- Inclusive Terminology Pull Request Comment -->`;
    await github.issues.createComment({
        ...repo,
        issue_number,
        body: `${HEADER}\n${comment}`
    });
}

async function updateComment(github, repo, comment_id, comment) {
    const HEADER = `<!-- Inclusive Terminology Pull Request Comment -->`;
    await github.issues.updateComment({
        ...repo,
        comment_id,
        body: `${HEADER}\n${comment}`
    });
}

async function findPreviousComment(github, repo, issue_number) {
    const HEADER = `<!-- Inclusive Terminology Pull Request Comment -->`; // Always a technical comment
    const { data: comments } = await github.issues.listComments({
        ...repo,
        issue_number
    });

    comments.map(comment => {
        console.log("MATCH: ", comment.body.startsWith(HEADER))
        console.log("Body", comment.body)
    })

    return comments.find(comment => comment.body.startsWith(HEADER));
}


export default {
    findPreviousComment,
    createComment,
    updateComment,
    generateComment
}