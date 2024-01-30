"use server";
import * as z from "zod";
import { LoginSchema } from "@/shemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Get the validated field
  const validatedField = LoginSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: "Invalid credentials!" };
  }
  return {
    success: "Validated!"
  };
};
