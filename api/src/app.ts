import fastify from "fastify";
import { appRoutes } from "./http/routes";
import cookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { ZodError } from "zod";
import cors from '@fastify/cors';

export const app = fastify();

app.register(cookie);

app.register(appRoutes);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        signed: false,
        cookieName: 'accessToken'
    }
});

app.register(cors, {
    origin: ["http://localhost:3000", "http://192.168.3.100:3000"], //alterar
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
});

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "erro de validação", issues: error.format() })
    }

    if (env.NODE_ENV == "dev") {
        console.log(error);
    }

    return reply.status(500).send({ message: "erro no servidor" });
});