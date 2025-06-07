import { GroupRepositorie } from "@/repositories/group-repositorie";
import { EmpetyGroupError } from "@/services/errors/empty-group-error";
import { NoEnoughMembersError } from "@/services/errors/no-enough-members-error";
import { GroupAdminService } from "@/services/group-admin";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function startGroupController(request: FastifyRequest, reply: FastifyReply) {

    const bodySchema = z.object({
        groupId: z.string()
    });

    const { groupId } = bodySchema.parse(request.body);
    const groupRepositorie = new GroupRepositorie();
    const groupService = new GroupAdminService(groupRepositorie);

    try {
        await groupService.start(groupId);
    } catch (error) {
        if (error instanceof EmpetyGroupError || error instanceof NoEnoughMembersError) {
            return reply.status(400).send({ message: error.message });
        }
        throw error;
    }

    return reply.status(200).send();
}