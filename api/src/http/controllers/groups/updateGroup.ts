import { GroupRepositorie } from "@/repositories/group-repositorie";
import { GroupAdminService } from "@/services/group-admin";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function groupUpdateController(request: FastifyRequest, reply: FastifyReply) {
    const groupBodySchema = z.object({
        groupId: z.string().uuid(),
        title: z.string(),
        description: z.string().optional(),
        maxValue: z.coerce.number(),
        minValue: z.coerce.number(),
        date: z.string().datetime(),
    });

    const { groupId, title, description, date, maxValue, minValue } = groupBodySchema.parse(request.body);

    const groupRepositorie = new GroupRepositorie();
    const groupService = new GroupAdminService(groupRepositorie);

    await groupService.updateInfoGroup({ title, description, groupId, date, max_value: maxValue, min_value: minValue });

    return reply.status(200).send();
}