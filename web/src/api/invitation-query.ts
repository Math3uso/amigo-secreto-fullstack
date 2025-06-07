import { AxiosError } from "axios";
import { base } from "./base";

export class InvitationQuery {
    static async acceptInvitation(id: string) {
        try {
            const data = await base.get(`group/invite/${id}`,
                {
                    withCredentials: true
                });
            return data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }
}