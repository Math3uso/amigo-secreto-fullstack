import { GroupRepositorie } from "@/repositories/group-repositorie";
import { MemberNotFound } from "@/services/errors/member-not-found-error";
import { GroupService } from "@/services/group";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function releaveGroupController(request: FastifyRequest, reply: FastifyReply) {
    const groupParamSchema = z.object({
        groupId: z.string()
    });

    const { groupId } = groupParamSchema.parse(request.body);

    const { userId } = request.user as { userId: string };

    const groupRepositorie = new GroupRepositorie();
    const groupService = new GroupService(groupRepositorie);

    try {

        const { removedMember } = await groupService.LeaveTheGroup_teste({ groupId, userId })

        return reply.status(200).send({ message: "você saiu do grupo" });

    } catch (error) {
        if (error instanceof MemberNotFound) {
            return reply.status(400).send({ message: error.message });
        }
        throw error;
    }

}