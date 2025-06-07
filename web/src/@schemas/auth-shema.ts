import { z } from "zod";

export const authDataSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Senha muito curta" }),
});

export type AuthData = z.infer<typeof authDataSchema>;