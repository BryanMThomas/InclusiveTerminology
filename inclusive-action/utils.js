import { existsSync, readFileSync } from "fs-extra";
import { formatResponse } from './format';
import axios from "axios";

export async function generateComment(filesList) {
    //Verifies files are accessible
    const filteredFilesList = filesList.filter((value) => existsSync(value));
    //Iterate through files checking each one
    return Promise.all(filteredFilesList.map(async file => {
        try {
            const resp = await checkFile(file);
            return { filePath: file, result: resp };
        } catch (err) {
            console.log("Error on File: ", file, " Error: ", err)
        }
    })).then((resolved) => {
        return formatResponse(resolved);
    })
}

async function checkFile(file) {
    console.log(`checking ${file}`)
    const body = readFileSync(file, "utf-8");
    const response = await checkInput(body);
    return response.data.result;
}

function checkInput(inputText) {
    return axios.post(
        "http://20.84.176.56:81/scan", { input: inputText },
        { headers: { "Content-Type": "application/json" } }
    );
};

export async function createComment(github, repo, issue_number, comment) {
    const HEADER = `<!-- Inclusive Terminology Pull Request Comment -->`;
    await github.issues.createComment({
        ...repo,
        issue_number,
        body: `${HEADER}\n${comment}`
    });
}

export async function updateComment(github, repo, comment_id, comment) {
    const HEADER = `<!-- Inclusive Terminology Pull Request Comment -->`;
    await github.issues.updateComment({
        ...repo,
        comment_id,
        body: `${HEADER}\n${comment}`
    });
}

export async function findPreviousComment(github, repo, issue_number) {
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