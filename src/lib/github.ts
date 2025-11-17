"use server";

import { config } from "@/src/config";
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import { RequestError } from "@octokit/request-error";

const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: config.GITHUB_APP_ID,
    privateKey: config.GITHUB_PRIVATE_KEY,
    installationId: config.GITHUB_INSTALLATION_ID,
  },
});

export async function repoExists(repoName: string) {
  try {
    await octokit.repos.get({ owner: config.GITHUB_ORG_NAME, repo: repoName });
    return true;
  } catch (err) {
    if (err instanceof RequestError && err.status === 404) {
      return false;
    }
    throw err;
  }
}

export async function cloneTemplate(repoName: string) {
  const exists = await repoExists(repoName);

  if (exists) {
    throw new Error(`Repository ${repoName} already exists`);
  }

  const { data } = await octokit.repos.createUsingTemplate({
    template_owner: config.GITHUB_ORG_NAME,
    template_repo: config.GITHUB_TEMPLATE_REPO,
    owner: config.GITHUB_ORG_NAME,
    name: repoName,
    private: false,
    description: `Client project: ${repoName}`,
  });

  return {
    name: data.name,
    url: data.html_url,
    cloneUrl: data.clone_url,
    sshUrl: data.ssh_url,
  };
}
