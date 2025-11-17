"use client";

import { useActionState } from "react";
import { deleteProjectAction } from "@/src/server/projects";

export function DeleteProjectForm(props: { projectName: string }) {
  const deleteProjectActionWithName = deleteProjectAction.bind(
    null,
    props.projectName
  );

  const [error, action, pending] = useActionState(
    deleteProjectActionWithName,
    []
  );

  return (
    <form action={action}>
      <button disabled={pending}>Delete</button>
      {error.length > 0 && (
        <ul>
          {error.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
