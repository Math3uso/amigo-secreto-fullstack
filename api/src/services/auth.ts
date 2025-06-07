import { IUserRepositorie } from "@/interfaces/user-repositorie-interface";
import { CredentialsInvaliedError } from "./errors/credentials-invalid-error";
import { getTokens } from "@/lib/get-tokens";
import { compare } from "bcrypt";

interface AuthRegisterRequest {
    email: string;
    password: string;
}

interface AuthServiceResponse {
    tokens: {
        accessToken: string;
        refrashToken: string;
    };
}

export class AuthService {
    constructor(
        private userRepositorie: IUserRepositorie,
    ) { }

    async execute({ email, password }: AuthRegisterRequest): Promise<AuthServiceResponse> {
        const user = await this.userRepositorie.findUserByEmail(email);
        if (!user) throw new CredentialsInvaliedError();

        const isValidPassword = await compare(password, user.password as string);

        if (!isValidPassword) throw new CredentialsInvaliedError();

        const tokens = getTokens(user.id);
        await this.userRepositorie.validateUser({
            refrashToken: tokens.refrashToken,
            confirmationSentAt: new Date().toISOString(),
            email,
        });

        return { tokens }
    }
}