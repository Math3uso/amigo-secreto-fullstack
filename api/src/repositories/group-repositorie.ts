import { CreateMemberRequest, IGroupRepositorie, InvitationRequest, MemberRequest, UpdateGroupInfoRequest, UpdateInviteRequest } from "@/interfaces/group-repositorie";
import { prisma } from "@/lib/prisma";
import { Prisma, Group, Member, Invitation } from "generated/prisma";

export class GroupRepositorie implements IGroupRepositorie {
    async startGroup(groupId: string): Promise<Group | null> {
        return await prisma.group.update({
            where: {
                id: groupId
            },
            data: {
                start: true
            }
        });
    }

    async getMemberByUserId({ groupId, userId }: MemberRequest): Promise<Member | null> {
        return await prisma.member.findFirst({
            where: {
                user_id: userId,
                groupId: groupId
            }
        });
    }

    async deleteGroupByGroupId(groupId: string): Promise<Group> {
        return await prisma.$transaction(async () => {
            await prisma.member.deleteMany({
                where: {
                    groupId
                }
            });
            await prisma.invitation.deleteMany({
                where: {
                    group_id: groupId
                }
            });
            return await prisma.group.delete({
                where: {
                    id: groupId
                }
            });
        })
    }
    async setAllMembersSelectIdByMemberId(members: Member[]): Promise<Member[]> {
        const updates = members.map((current) => {
            return prisma.member.update({
                where: {
                    id: current.id
                },
                data: {
                    user_select_id: current.user_select_id
                }
            });
        });

        return Promise.all(updates);
    }
    async getAllMembersByGroupId(groupId: string): Promise<Member[]> {
        return await prisma.member.findMany({
            where: {
                groupId,
            }
        });
    }
    async getMemberByMemberId(memberId: string): Promise<Member | null> {
        return await prisma.member.findFirst({
            where: {
                id: memberId
            },
        });
    }
    async removeMemberByMemberId(memberId: string): Promise<Member | null> {
        return await prisma.member.delete({
            where: {
                id: memberId
            }
        });
    }
    async updateInfoGroup({ groupId, title, description, date, max_value, min_value }: UpdateGroupInfoRequest): Promise<Group> {
        return await prisma.group.update({
            where: {
                id: groupId,
            },
            data: {
                title,
                description,
                date,
                max_value,
                min_value,
            }
        });
    }
    async createMember({ groupId, userId }: CreateMemberRequest): Promise<Member> {
        console.log("criando");
        return await prisma.member.create({
            data: {
                role: "USER",
                groupId,
                user_id: userId
            }
        });
    }

    async getIviteByInviteId(inviteId: string): Promise<Invitation | null> {
        return await prisma.invitation.findUnique({
            where: { id: inviteId }
        });
    }
    async getInviteByGroupId(groupId: string): Promise<Invitation | null> {
        const invite = await prisma.invitation.findUnique({
            where: { group_id: groupId }
        });
        return invite;
    }
    async updateInviteByGroupId({ groupId, newInvite }: UpdateInviteRequest): Promise<Invitation> {
        const invite = await prisma.invitation.update({
            where: { group_id: groupId },
            data: newInvite
        });

        return invite;
    }
    async getGroupByGroupBy(groupId: string, inviti?: boolean): Promise<Group & { members: Member[] } | null> {
        const group = await prisma.group.findUnique({
            where: {
                id: groupId,
            },
            include: {
                members: true,
                Invitation: inviti ?? true,
            }
        });
        return group;
    }

    async getInfoGroupByGroupId(groupId: string, inviti?: boolean): Promise<any> {
        const group = await prisma.group.findUnique({
            where: {
                id: groupId,
            },
            include: {
                members: {
                    select: {
                        id: true,
                        role: true,
                        groupId: true,
                        user: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                Invitation: inviti ?? true,
            }
        });
        return group;
    }

    async createInvitation({ groupId, time, id }: InvitationRequest): Promise<Invitation> {
        const invite = await prisma.invitation.create({
            data: {
                id,
                group_id: groupId,
                expire_time: time
            }
        });

        return invite;
    }
    async createMemberAdmin(userId: string, groupId: string): Promise<Member> {
        const admin = await prisma.member.create({
            data: {
                user_id: userId,
                role: "ADMIN",
                groupId
            }
        });

        return admin;
    }
    async create(data: Prisma.GroupCreateInput): Promise<Group> {
        const newGroup = await prisma.group.create({
            data
        });

        return newGroup;
    }

}