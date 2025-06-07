import { Group, Member, Prisma, User } from "generated/prisma";
import { IUserRepositorie, ValidateUserRequest } from "../interfaces/user-repositorie-interface";
import { prisma } from "@/lib/prisma";

export class UserRepositorie implements IUserRepositorie {
    async getAllMembersByUserId(userId: string): Promise<Member[]> {
        const members = await prisma.member.findMany({
            where: {
                user_id: userId
            },
            include: {
                Group: {
                    include: {
                        members: {
                            select: {
                                id: true,
                                role: true,
                                user: {
                                    select: {
                                        name: true,
                                    }
                                }
                            }
                        },
                    }
                },
            },
        });
        return members;
    }
    getRefrashTokenByUserId(userId: string): Promise<{ refrashToken: string; } | null> {
        throw new Error("Method not implemented.");
    }
    async validateUser
        ({ confirmationSentAt, email, refrashToken }: ValidateUserRequest): Promise<User | null> {
        const updateUser = await prisma.user.update({
            where: {
                email,
            },
            data: {
                // access_token: accessToken,
                refreash_token: refrashToken,
                email_confirmation: true,
                confirmation_sent_at: confirmationSentAt,
            }
        });

        return updateUser;
    }
    async findUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }
    async create(user: Prisma.UserCreateInput): Promise<User> {
        const newUser = await prisma.user.create({
            data: user
        });

        return newUser;
    }
    async findUserById(userId: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        return user;
    }

    // async getRefrashTokenByUserId(userId: string) {
    //     const user = await prisma.user.findUnique({
    //         where: { id: userId }
    //     });
    //     if (!user) return null;
    //     return user.refreash_token;
    // }

}