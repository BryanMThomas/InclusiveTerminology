import { getInput, setFailed } from '@actions/core';
import { context, exit, getOctokit } from '@actions/github';
import { create } from '@actions/glob';
import { resolve } from "path";
import { findPreviousComment, createComment, updateComment, generateComment } from "./utils";

//Execute Work Flow
async function run() {
  try {
    const allFiles = JSON.parse(getInput("allFiles").toLowerCase())
    const githubToken = getInput("GITHUB_TOKEN", { required: true });
    const pullRequestNumber = context.payload.pull_request.number;

    if (!pullRequestNumber) { // event was not a pull request
      console.log('Unexpected event occurred. action context: ', context.payload)
      exit.neutral('Exited with unexpected event')
    }

    const octokit = getOctokit(githubToken);

    //get all Files in workspace that match globPattern
    const globber = await create('*');
    let files = await globber.glob()

    //only scan changed files if allFiles is set to false
    if (!allFiles) {
      const prInfo = await octokit.graphql(
        `
            query prInfo($owner: String!, $name: String!, $prNumber: Int!) {
              repository(owner: $owner, name: $name) {
                pullRequest(number: $prNumber) {
                  files(first: 100) {
                    nodes {
                      path
                    }
                  }
                }
              }
            }
          `,
        {
          owner: context.repo.owner,
          name: context.repo.repo,
          prNumber: pullRequestNumber
        }
      );
      let prFiles = prInfo.repository.pullRequest.files.nodes.map(f => resolve(f.path));
      files = files.filter(x => prFiles.includes(x))
      console.log("Files Changed in PR", files);
    }

    //Completes the term check & generated comment for PR
    const prBotComment = await generateComment(files);
    //checks if PR has already been commented on by bot
    const previousPr = await findPreviousComment(octokit, context.repo, pullRequestNumber);
    if (previousPr) {
      console.log("Found already created comment")
      await updateComment(octokit, context.repo, previousPr.id, prBotComment)
    } else {
      console.log("Created new comment")
      await createComment(octokit, context.repo, pullRequestNumber, prBotComment);
    }
  } catch (err) {
    setFailed(err.message);
  }
}

run();
