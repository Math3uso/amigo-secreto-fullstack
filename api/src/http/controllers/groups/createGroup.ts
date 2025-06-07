import { GroupRepositorie } from "@/repositories/group-repositorie";
import { GroupService } from "@/services/group";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function groupCreateController(request: FastifyRequest, reply: FastifyReply) {
    const groupBodySchema = z.object({
        title: z.string(),
        description: z.string().optional(),
        maxValue: z.coerce.number(),
        minValue: z.coerce.number(),
        date: z.string().datetime(),
    });

    const { title, description, maxValue, minValue, date } = groupBodySchema.parse(request.body);

    const groupRepositorie = new GroupRepositorie();
    const groupService = new GroupService(groupRepositorie);
    const { userId } = request.user as { userId: string };

    const newGroup = await groupService.create({ title, description, userId, date, max_value: maxValue, min_value: minValue });

    return reply.status(201).send({ newGroup });
}