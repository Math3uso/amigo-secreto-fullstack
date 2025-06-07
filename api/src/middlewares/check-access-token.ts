import { FastifyReply, FastifyRequest } from "fastify";
import { TokenExpiredError } from "jsonwebtoken";

export async function checkAccessToken(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return reply.status(401).send({ code: "token_expired" });
        }
        return reply.status(401).send({ code: "token_invalido", message: "erro de autenticação", error });
    }
}