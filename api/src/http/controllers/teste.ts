import { UserRepositorie } from "@/repositories/user-repositorie";
import { RefrashTokenService } from "@/services/refrash-token-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function Teste(request: FastifyRequest, reply: FastifyReply) {

    const { userId } = request.user as { userId: string };

    const userRepositorie = new UserRepositorie();
    const refrashTokenService = new RefrashTokenService(userRepositorie);

    const refrashToken = request.cookies.refrashToken as string;

    console.log(refrashToken);

    try {

        const { } = await refrashTokenService.execute({ userId, refrashToken });

    } catch (error) {
        return reply.status(401).send({ message: "Token inválido ou expirado" });
    }

    // return reply.status(200).send({ message: "foi", userId });
}