import { FastifyReply, FastifyRequest } from "fastify";

export async function memberMeController(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send();
}