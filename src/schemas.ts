import { z } from "zod";

export const createProjectSchema = z.object({
  projectName: z
    .string()
    .min(1, "Client name is required")
    .regex(
      /^[a-zA-Z0-9-]+$/,
      "Client name must only contain letters, numbers, and dashes"
    ),
});
