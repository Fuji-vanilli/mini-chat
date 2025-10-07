import z from "zod";
import { getUserToken } from "./sessions.server";

const getAuthenticatedUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

export const getAuthenticatedUser = async (request: Request) => {
    const response = await fetch("http://localhost:3000/auth/me", {
        headers: {
            Authorization: `Bearer ${await getUserToken(request)}`,
        },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const result = getAuthenticatedUserSchema.parse(data);

    return result;
}