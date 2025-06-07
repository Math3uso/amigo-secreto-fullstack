import { GroupRepositorie } from "@/repositories/group-repositorie";
import { GroupService } from "@/services/group";
import { GroupAdminService } from "@/services/group-admin";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function groupDeleteController(request: FastifyRequest, reply: FastifyReply) {
    const groupBodySchema = z.object({
        groupId: z.string()
    });

    const { groupId } = groupBodySchema.parse(request.body);

    const groupRepositorie = new GroupRepositorie();
    const groupService = new GroupAdminService(groupRepositorie);

    try {
        const { removedGroup } = await groupService.deletedGroup(groupId);
        return reply.status(200).send({ message: "grupo deletado" });
    } catch (error) {
        throw error;
    }
}