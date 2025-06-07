import { IUserRepositorie } from "@/interfaces/user-repositorie-interface";
import { AuthError } from "@supabase/supabase-js";
import { User } from "generated/prisma";
import { ISupabaseAuthProvider } from "@/interfaces/i-supabse-auth-provider";
import { UserAlreadyEmailExistsError } from "./errors/user-already-email-exists-error";
import bscrypt from "bcrypt";

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterServiceResponse {
    user: User;
}

export class RegisterService {
    constructor(private userRepositorie: IUserRepositorie) { }

    async execute({ name, email, password }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
        const userWithEmail = await this.userRepositorie.findUserByEmail(email);

        if (userWithEmail) {
            throw new UserAlreadyEmailExistsError();
        }

        try {
            const passwordHash = await bscrypt.hash(password, 6);

            const user = await this.userRepositorie.create({
                name,
                email,
                password: passwordHash
            });

            return {
                user,
            }

        } catch (error) {
            if (error instanceof AuthError) throw error;
            console.error('Unexpected error during registration:', error);
            throw new Error("Registration failed");
        }
    }
}