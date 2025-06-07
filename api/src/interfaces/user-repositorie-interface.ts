import { Group, Member, Prisma, User } from "generated/prisma";

export interface ValidateUserRequest {
    //accessToken: string;
    refrashToken: string;
    email: string;
    confirmationSentAt: string;
}

export interface IUserRepositorie {
    findUserById(userId: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    create(user: Prisma.UserCreateInput): Promise<User>;
    validateUser(data: ValidateUserRequest): Promise<User | null>;
    getRefrashTokenByUserId(userId: string): Promise<{ refrashToken: string } | null>;
    getAllMembersByUserId(userId: string): Promise<Member[]>;
}