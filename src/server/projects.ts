"use server";

import { redirect } from "next/navigation";
import { createProjectSchema } from "../schemas";
import * as github from "@/src/lib/github";

export async function projectExists(projectName: string) {
  return await github.projectExists(projectName);
}

export async function listProjects() {
  return await github.listProjects();
}

export async function createProjectAction(
  prevState: string[],
  formData: FormData
): Promise<string[]> {
  const projectName = formData.get("projectName");

  const parsed = createProjectSchema.safeParse({ projectName });

  if (!parsed.success) {
    return [parsed.error.issues[0].message];
  }

  try {
    await github.createProject(parsed.data.projectName);
  } catch (error) {
    if (error instanceof Error) {
      return [error.message];
    }

    return ["An unexpected error occurred"];
  }

  return redirect("/");
}

export async function deleteProjectAction(projectName: string) {
  const parsed = createProjectSchema.safeParse({ projectName });

  if (!parsed.success) {
    return [parsed.error.issues[0].message];
  }

  try {
    await github.deleteProject(parsed.data.projectName);
  } catch (error) {
    if (error instanceof Error) {
      return [error.message];
    }

    return ["An unexpected error occurred"];
  }

  return redirect("/");
}
