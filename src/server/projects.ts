"use server";

import { config } from "@/src/config";
import { redirect } from "next/navigation";
import { createProjectSchema } from "../schemas";
import { repoExists, cloneTemplate } from "@/src/lib/github";

function getRepoName(clientName: string) {
  return `${config.PROJECT_PREFIX}-${clientName}`;
}

export async function projectExists(clientName: string) {
  const repoName = getRepoName(clientName);

  return await repoExists(repoName);
}

export async function createProjectAction(
  prevState: string[],
  formData: FormData
): Promise<string[]> {
  const clientName = formData.get("clientName");

  const parsed = createProjectSchema.safeParse({ clientName });

  if (!parsed.success) {
    return [parsed.error.issues[0].message];
  }

  const repoName = getRepoName(parsed.data.clientName);

  try {
    await cloneTemplate(repoName);
  } catch (error) {
    if (error instanceof Error) {
      return [error.message];
    }

    return ["An unexpected error occurred"];
  }

  redirect(`/projects/${parsed.data.clientName}`);
}
