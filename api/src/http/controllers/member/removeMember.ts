import { GroupRepositorie } from "@/repositories/group-repositorie";
import { MemberNotFound } from "@/services/errors/member-not-found-error";
import { RemovingMemberError } from "@/services/errors/removed-member-error";
import { GroupAdminService } from "@/services/group-admin";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function removeMemberController(request: FastifyRequest, reply: FastifyReply) {
    const groupParamSchema = z.object({
        member: z.string()
    });

    const { member } = groupParamSchema.parse(request.query);
    const { userId } = request.user as { userId: string };

    const groupRepositorie = new GroupRepositorie();
    const groupService = new GroupAdminService(groupRepositorie);

    try {

        await groupService.removeMember(member, userId);

    } catch (error) {
        if (error instanceof MemberNotFound) {
            return reply.status(400).send({ message: "membro n encontrado no grupo" });
        }
        if (error instanceof RemovingMemberError) {
            return reply.status(400).send({ message: "não é possivel remover a si mesmo" });
        }
        throw error;
    }
    return reply.status(200).send();
}