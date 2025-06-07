import { UserRepositorie } from "@/repositories/user-repositorie";
import { AuthService } from "@/services/auth";
import { CredentialsInvaliedError } from "@/services/errors/credentials-invalid-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
    const userBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6, { message: "a senha deve conter ao menos 6 caracteres" }),
    });

    const { email, password } = userBodySchema.parse(request.body);
    const userRepositorie = new UserRepositorie();
    const authService = new AuthService(userRepositorie);

    try {
        const { tokens } = await authService.execute({ email, password });
        reply.setCookie('accessToken', tokens.accessToken, {
            path: '/',
            httpOnly: true,
            secure: false, // permite http
            sameSite: 'lax', // permite dominios diferentes
            maxAge: 60 * 60 * 24 // 1 dia
        }).status(200).send({ message: "usúario logado" });

    } catch (error) {
        if (error instanceof CredentialsInvaliedError) {
            return reply.status(400).send({ message: error.message });
        }
        throw new Error("error");
    }
}