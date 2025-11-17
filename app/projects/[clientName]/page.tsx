import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { projectExists } from "@/src/server/projects";
import { DeleteProjectForm } from "@/components/DeleteProjectForm";

type Props = {
  params: Promise<{
    clientName: string;
  }>;
};

export default async function ShowProjectPage(props: Props) {
  const { clientName } = await props.params;

  const valid = await projectExists(clientName);

  if (!valid) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{clientName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button size="lg" className="w-full">
            Start Sandbox
          </Button>
          <div className="flex justify-end">
            <DeleteProjectForm projectName={clientName} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
