import z from "zod"

export const imageSchema = z.object({
  name: z.string().min(2, "Image name cannot be empty"),

  tree: z.array(z.string()).min(1, "Tree of directories is required"),

  size: z.enum(
    ["full", "small", "xsmall", "none"],
    'Size must be one of "full", "small", "xsmall" or "none".'
  ),
})
