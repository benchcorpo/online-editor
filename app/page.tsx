import Link from "next/link";
import { listProjects } from "@/src/lib/github";
import { CreateProjectForm } from "@/components/CreateProjectForm";
import { DeleteProjectForm } from "@/components/DeleteProjectForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await listProjects();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateProjectForm />
        </CardContent>
      </Card>

      {projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {projects.map((project, i) => (
                <li key={i} className="flex items-center justify-between">
                  <Link
                    href={`/projects/${project.name}`}
                    className="text-blue-600 hover:underline"
                  >
                    {project.name}
                  </Link>
                  <DeleteProjectForm projectName={project.name} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
