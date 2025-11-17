import { notFound } from "next/navigation";
import { projectExists } from "@/src/server/projects";

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
    <div>
      <h1>Project for {clientName}</h1>
    </div>
  );
}
