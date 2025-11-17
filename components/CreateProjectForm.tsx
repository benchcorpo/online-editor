"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useActionState } from "react";
import { createProjectAction } from "@/src/server/projects";

export function CreateProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [error, action, pending] = useActionState(createProjectAction, []);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          type="text"
          id="projectName"
          name="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="client-name"
          disabled={pending}
          required
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Project"}
      </Button>
      {error.length > 0 && (
        <ul className="text-sm text-red-600 space-y-1">
          {error.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
