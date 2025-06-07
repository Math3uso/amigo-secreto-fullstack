import { UserRepositorie } from "@/repositories/user-repositorie";

export class UserService {
    constructor(private userRepositorie: UserRepositorie) { }

    async getAllMembersByUserId(userId: string) {
        const members = await this.userRepositorie.getAllMembersByUserId(userId);

        return members;
    }
}