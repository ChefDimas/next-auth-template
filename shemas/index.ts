import * as z from "zod";

// Register schema validation
export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string(),
});
