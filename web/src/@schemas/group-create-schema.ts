import { z } from "zod";

export const groupCreateSchema = z.object({
    title: z.string().nonempty({ message: "titulo obrigatorio" }),
    description: z.string().optional(),
    maxValue: z.string(),
    minValue: z.string(),
    date: z.date({ message: "Data obrigatoria" }),
});

export type GroupCreate = z.infer<typeof groupCreateSchema>;

export type GroupUpdate = GroupCreate & { groupId: string };