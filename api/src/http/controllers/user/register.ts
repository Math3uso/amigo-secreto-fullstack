import { UserRepositorie } from "@/repositories/user-repositorie";
import { UserAlreadyEmailExistsError } from "@/services/errors/user-already-email-exists-error";
import { RegisterService } from "@/services/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const userBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6, { message: "a senha deve conter ao menos 6 caracteres" }),
    });

    const { name, email, password } = userBodySchema.parse(request.body);

    const userRepisitorie = new UserRepositorie();
    const registerService = new RegisterService(userRepisitorie);

    try {
        const { user } = await registerService.execute({ name, email, password });
    } catch (error) {
        if (error instanceof UserAlreadyEmailExistsError) {
            return reply.status(400).send({ message: "e-mail já encontrado. Tente usar outro e-mail" });
        }
        throw error;
    }

    return reply.status(201).send();
}