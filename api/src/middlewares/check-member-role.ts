import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { TokenExpiredError } from "jsonwebtoken";
import { z } from "zod";

const groupBodySchema = z.object({
    groupId: z.string()
});

export async function checkMemberRole(request: FastifyRequest, reply: FastifyReply) {

    const { userId } = request.user as { userId: string };

    const { groupId } = groupBodySchema.parse(request.body);

    const group = await prisma.group.findUnique({
        where: { id: groupId }
    });

    const member = await prisma.member.findFirst({
        where: {
            groupId: groupId,
            user_id: userId
        }
    });

    if (!group) {
        return reply.status(400).send({ message: "grupo não encontrado" });
    }
    if (!member) {
        return reply.status(400).send({ message: "usúario não encontrado" });
    }

    if (member.role !== "ADMIN") {
        return reply.status(400).send({ message: "não autorizado" });
    }
}