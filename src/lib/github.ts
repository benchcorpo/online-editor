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

function getRepoName(projectName: string) {
  return `${config.PROJECT_PREFIX}-${projectName}`;
}

function stripPrefix(repoName: string): string {
  if (repoName.startsWith(`${config.PROJECT_PREFIX}-`)) {
    return repoName.slice(config.PROJECT_PREFIX.length + 1);
  }
  return repoName;
}

async function repoExists(repoName: string) {
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

export async function listProjects() {
  const { data } = await octokit.repos.listForOrg({
    org: config.GITHUB_ORG_NAME,
    type: "all",
    sort: "updated",
    direction: "desc",
    per_page: 100,
  });

  const filteredRepos = data.filter((repo) =>
    repo.name.startsWith(`${config.PROJECT_PREFIX}-`)
  );

  return filteredRepos.map((repo) => ({
    repo: repo.name,
    name: stripPrefix(repo.name),
    url: repo.html_url,
    description: repo.description,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    isTemplate: repo.is_template,
    private: repo.private,
  }));
}

export async function projectExists(projectName: string) {
  const repoName = getRepoName(projectName);

  return await repoExists(repoName);
}

export async function createProject(projectName: string) {
  const repoName = getRepoName(projectName);

  const exists = await repoExists(repoName);

  if (exists) {
    throw new Error(`Repository ${repoName} for ${projectName} already exists`);
  }

  const { data } = await octokit.repos.createUsingTemplate({
    template_owner: config.GITHUB_ORG_NAME,
    template_repo: config.GITHUB_TEMPLATE_REPO,
    owner: config.GITHUB_ORG_NAME,
    name: repoName,
    private: false,
    description: `Client project: ${projectName}`,
  });

  return {
    name: data.name,
    url: data.html_url,
    cloneUrl: data.clone_url,
    sshUrl: data.ssh_url,
  };
}

export async function deleteProject(projectName: string) {
  const repoName = getRepoName(projectName);

  const exists = await repoExists(repoName);

  if (!exists) {
    throw new Error(`Repository ${repoName} for ${projectName} does not exist`);
  }

  try {
    await octokit.repos.delete({
      owner: config.GITHUB_ORG_NAME,
      repo: repoName,
    });

    return true;
  } catch (err) {
    if (err instanceof RequestError) {
      throw new Error(
        `Failed to delete repository ${repoName} for ${projectName}`
      );
    }
    throw err;
  }
}
