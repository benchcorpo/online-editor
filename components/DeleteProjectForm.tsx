"use client";

import { useActionState } from "react";
import { deleteProjectAction } from "@/src/server/projects";
import { Button } from "@/components/ui/button";

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
      <Button type="submit" variant="destructive" size="sm" disabled={pending}>
        {pending ? "Deleting..." : "Delete"}
      </Button>
      {error.length > 0 && (
        <ul className="text-sm text-red-600 space-y-1 mt-2">
          {error.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
