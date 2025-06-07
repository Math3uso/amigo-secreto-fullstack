import { AuthData } from "@/@schemas/auth-shema";
import { base } from "./base";
import { AxiosError } from "axios";
import { RegisterhData } from "@/@schemas/register-schema";

export class Auth {
    static async execute({ email, password }: AuthData) {
        try {
            const data = await base.post("/auth", {
                email,
                password
            }, {
                withCredentials: true
            });
            console.log(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }

    static async register({ name, email, password }: RegisterhData) {
        try {
            const data = await base.post("/register", {
                name,
                email,
                password
            }, {
                withCredentials: true
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }
}