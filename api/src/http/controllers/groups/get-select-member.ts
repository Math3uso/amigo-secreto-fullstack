import { GroupRepositorie } from "@/repositories/group-repositorie";
import { UserNotDraw } from "@/services/errors/ user-not-drawn";
import { CredentialsInvaliedError } from "@/services/errors/credentials-invalid-error";
import { MemberNotFound } from "@/services/errors/member-not-found-error";
import { GroupService } from "@/services/group";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getSelectMember(request: FastifyRequest, reply: FastifyReply) {

    console.log('getSelectMember');

    const bodySquema = z.object({
        groupId: z.string()
    });

    const { groupId } = bodySquema.parse(request.body);

    const groupRepositorie = new GroupRepositorie();
    const groupService = new GroupService(groupRepositorie);

    const { userId } = request.user as { userId: string };

    try {

        const { userSelectId } = await groupService.GetSelectedMember({ groupId, userId });
        return reply.status(200).send({ userSelectId });

    } catch (error) {
        if (error instanceof CredentialsInvaliedError || error instanceof UserNotDraw) {
            return reply.status(400).send({
                message: error.message,
                code: error instanceof UserNotDraw ? 'USER_NOT_DRAW' : 'INVALID_CREDENTIALS',
            });
        } else if (error instanceof MemberNotFound) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
}