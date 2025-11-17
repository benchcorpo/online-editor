const PROJECT_PREFIX = process.env.PROJECT_PREFIX;
const GITHUB_ORG_NAME = process.env.GITHUB_ORG_NAME;
const GITHUB_TEMPLATE_REPO = process.env.GITHUB_TEMPLATE_REPO;

const GITHUB_APP_ID = process.env.GITHUB_APP_ID;
const GITHUB_INSTALLATION_ID = process.env.GITHUB_INSTALLATION_ID;
const GITHUB_PRIVATE_KEY_BASE64 = process.env.GITHUB_PRIVATE_KEY_BASE64;

if (PROJECT_PREFIX === undefined) {
  throw new Error("PROJECT_PREFIX env var must be defined");
}

if (GITHUB_ORG_NAME === undefined) {
  throw new Error("GITHUB_ORG_NAME env var must be defined");
}

if (GITHUB_TEMPLATE_REPO === undefined) {
  throw new Error("GITHUB_TEMPLATE_REPO env var must be defined");
}

if (GITHUB_APP_ID === undefined) {
  throw new Error("GITHUB_APP_ID env var must be defined");
}

if (GITHUB_INSTALLATION_ID === undefined) {
  throw new Error("GITHUB_INSTALLATION_ID env var must be defined");
}

if (GITHUB_PRIVATE_KEY_BASE64 === undefined) {
  throw new Error("GITHUB_PRIVATE_KEY_BASE64 env var must be defined");
}

const GITHUB_PRIVATE_KEY = Buffer.from(
  GITHUB_PRIVATE_KEY_BASE64,
  "base64"
).toString("utf8");

export const config = {
  PROJECT_PREFIX,
  GITHUB_ORG_NAME,
  GITHUB_TEMPLATE_REPO,
  GITHUB_APP_ID,
  GITHUB_INSTALLATION_ID,
  GITHUB_PRIVATE_KEY,
};
