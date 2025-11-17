import Link from "next/link";
import { listProjects } from "@/src/lib/github";
import { CreateProjectForm } from "@/components/CreateProjectForm";
import { DeleteProjectForm } from "@/components/DeleteProjectForm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await listProjects();

  return (
    <div>
      <CreateProjectForm />
      {projects.length > 0 && (
        <ul>
          {projects.map((project, i) => (
            <li key={i}>
              <Link href={`/projects/${project.name}`}>{project.name}</Link>
              <DeleteProjectForm projectName={project.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
