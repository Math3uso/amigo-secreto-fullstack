import { GroupRepositorie } from "@/repositories/group-repositorie";
import { GroupAdminService } from "@/services/group-admin";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function groupDetailsController(request: FastifyRequest, reply: FastifyReply) {
    const groupBodySchema = z.object({
        groupId: z.string()
    });

    const { groupId } = groupBodySchema.parse(request.body);

    const groupRepositorie = new GroupRepositorie();
    const groupService = new GroupAdminService(groupRepositorie);

    try {
        const { groupInfo } = await groupService.getInfoGroup(groupId);
        return reply.status(200).send({ groupInfo });
    } catch (error) {
        throw error;
    }
}