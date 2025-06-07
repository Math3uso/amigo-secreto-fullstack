import { IUserRepositorie } from "@/interfaces/user-repositorie-interface";
import { CredentialsInvaliedError } from "./errors/credentials-invalid-error";
import { getTokens } from "@/lib/get-tokens";
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';
import { env } from "@/env";

interface RefrashTokenServiceRequest {
    userId: string;
    refrashToken: string;
}

interface RefrashTokenServiceResponse {
    newToken: string;
}

export class RefrashTokenService {
    constructor(
        private userRepositorie: IUserRepositorie,
    ) { }

    async execute({ refrashToken, userId }: RefrashTokenServiceRequest): Promise<RefrashTokenServiceResponse> {
        const user = await this.userRepositorie.findUserById(userId);
        if (!user) throw new CredentialsInvaliedError();


        try {
            const payload = jwt.verify(refrashToken, env.JWT_REFRESH_SECRET);

            console.log(payload);

        } catch (error) {
            console.error("Error verifying refresh token:", error);
            throw new CredentialsInvaliedError();
        }

        const isValidRefrashToken = await compare(refrashToken, user.refreash_token as string);

        if (!isValidRefrashToken) throw new CredentialsInvaliedError();

        const newToken = getTokens(user.id).accessToken;

        return { newToken };
    }
}