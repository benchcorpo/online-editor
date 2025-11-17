"use client";

import { useState, useActionState } from "react";
import { createProjectAction } from "@/src/server/projects";

export function CreateProjectForm() {
  const [clientName, setClientName] = useState("");
  const [error, action, pending] = useActionState(createProjectAction, []);

  return (
    <form action={action}>
      <input
        type="text"
        id="clientName"
        name="clientName"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        placeholder="Client name (example: client-a)"
        disabled={pending}
        required
      />
      <button disabled={pending}>Create Project</button>
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
