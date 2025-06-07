import { z } from "zod";

export const registerDataSchema = z.object({
    name: z.string().min(2, { message: "Nome muito curto" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Senha muito curta" }),
});

export type RegisterhData = z.infer<typeof registerDataSchema>;