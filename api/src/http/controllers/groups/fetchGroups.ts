import { UserRepositorie } from "@/repositories/user-repositorie";
import { UserService } from "@/services/user";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchGroupsController(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.user as { userId: string };

    const userRepositorie = new UserRepositorie();
    const userServie = new UserService(userRepositorie);

    try {
        const members = await userServie.getAllMembersByUserId(userId);
        return reply.status(200).send({ members });
    } catch (error) {
        throw error;
    }
}