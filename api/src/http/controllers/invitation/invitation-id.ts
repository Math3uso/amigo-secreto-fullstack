import { GroupRepositorie } from "@/repositories/group-repositorie";
import { AlreadyMemberError } from "@/services/errors/already-member-error";
import { InvalidGroupIdError } from "@/services/errors/invalid-group-id-error";
import { InvalidInvitationId } from "@/services/errors/invalid-invitation-id-error";
import { InvitationExpiredError } from "@/services/errors/invitation-expired-error";
import { GroupService } from "@/services/group";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function invitationIdController(request: FastifyRequest, reply: FastifyReply) {
    const invitationIdParamSchema = z.object({
        id: z.string().max(10),
    });

    const { id } = invitationIdParamSchema.parse(request.params);

    const groupRepositorie = new GroupRepositorie();
    const groupService = new GroupService(groupRepositorie);
    const { userId } = request.user as { userId: string };

    try {
        await groupService.acceptInvite({ invitationId: id, userId });
    } catch (error) {
        if (error instanceof InvalidInvitationId) {
            return reply.status(400).send({ message: "Este convite não é valido." });
        }
        if (error instanceof InvalidGroupIdError) {
            return reply.status(400).send({ message: "Este grupo não existe" });
        }
        if (error instanceof InvitationExpiredError) {
            return reply.status(400).send({ message: "Este convite está expirado" });
        }
        if (error instanceof AlreadyMemberError) {
            return reply.status(400).send({ message: "Você já é membro desse grupo" });
        }
    }

    return reply.status(200).send({ message: "convite aceito" });
}