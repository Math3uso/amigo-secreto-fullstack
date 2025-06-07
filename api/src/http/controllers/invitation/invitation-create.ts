import { GroupRepositorie } from "@/repositories/group-repositorie";
import { InvalidGroupIdError } from "@/services/errors/invalid-group-id-error";
import { GroupService } from "@/services/group";
import { GroupAdminService } from "@/services/group-admin";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function invitationCreateController(request: FastifyRequest, reply: FastifyReply) {
    const groupBodySchema = z.object({
        groupId: z.string().uuid(),
    });

    const { groupId } = groupBodySchema.parse(request.body);

    const groupRepositorie = new GroupRepositorie();
    const groupService = new GroupAdminService(groupRepositorie);

    try {
        const invite = await groupService.createInvitation({ groupId });

        return reply.status(200).send({ message: "convite criado", invite });

    } catch (error) {
        if (error instanceof InvalidGroupIdError) {
            return reply.status(400).send({ message: "id invalido", error });
        }
        throw error;
    }


    // return reply.status(201).send({ invite });
}