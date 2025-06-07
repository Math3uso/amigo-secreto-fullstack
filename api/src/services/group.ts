import { InvalidGroupIdError } from "./errors/invalid-group-id-error";
import { Invitation } from "generated/prisma";
import { randomUUID } from "crypto";
import { InvalidInvitationId } from "./errors/invalid-invitation-id-error";
import { InvitationExpiredError } from "./errors/invitation-expired-error";
import { AlreadyMemberError } from "./errors/already-member-error";
import { nanoid } from 'nanoid';
import { MemberNotFound } from "./errors/member-not-found-error";
import { CredentialsInvaliedError } from "./errors/credentials-invalid-error";
import { UserNotDraw } from "./errors/ user-not-drawn";
import { GroupRepositorie } from "@/repositories/group-repositorie";

interface GroupServiceCreateReq {
    userId: string;
    title: string;
    description?: string;
    max_value: number;
    min_value: number;
    date: string;
}

interface GroupServiceAcceptInvitation {
    userId: string;
    invitationId: string;
}

interface GroupServerLeaveMember {
    memberId: string;
    userId: string;
}

interface GroupServerLeaveMember_teste {
    groupId: string;
    userId: string;
}

interface GetSelectedMemberRequest {
    groupId: string;
    userId: string;
}

export class GroupService {
    constructor(
        private groupRepositorie: GroupRepositorie,
    ) { }

    async create({ description, title, userId, date, max_value, min_value }: GroupServiceCreateReq) {
        const newGruop = await this.groupRepositorie.create({ title, description, date, max_value, min_value });
        const adminUser = await this.groupRepositorie.createMemberAdmin(userId, newGruop.id);

        return {
            adminUser
        }
    }

    async acceptInvite({ invitationId, userId }: GroupServiceAcceptInvitation) {

        const isItValidInvitation = await this.groupRepositorie.getIviteByInviteId(invitationId);
        if (!isItValidInvitation) throw new InvalidInvitationId();

        const isItValidGroup = await this.groupRepositorie.getGroupByGroupBy(isItValidInvitation.group_id);

        if (!isItValidGroup) throw new InvalidGroupIdError();

        const isMember = isItValidGroup.members.find(member => member.user_id == userId);

        if (isMember) throw new AlreadyMemberError();

        if (isItValidInvitation.expire_time < new Date()) throw new InvitationExpiredError();

        const newMember = await this.groupRepositorie.createMember({ groupId: isItValidInvitation.group_id, userId });
        return {
            newMember,
        };
    }

    async LeaveTheGroup({ userId, memberId }: GroupServerLeaveMember) {
        const memberLeave = await this.groupRepositorie.getMemberByMemberId(memberId);
        if (!memberLeave) throw new MemberNotFound();

        if (memberLeave.user_id !== userId) {
            throw new CredentialsInvaliedError();
        }

        const removedMember = await this.groupRepositorie.removeMemberByMemberId(memberId);
        return {
            memberLeave,
        }
    }
    async LeaveTheGroup_teste({ userId, groupId }: GroupServerLeaveMember_teste) {
        const members = await this.groupRepositorie.getAllMembersByGroupId(groupId);
        const memberLeave = members.find(member => member.user_id === userId);
        if (!memberLeave) throw new MemberNotFound();
        if (memberLeave.role == "ADMIN") throw new CredentialsInvaliedError();

        const removedMember = await this.groupRepositorie.removeMemberByMemberId(memberLeave.id);
        return {
            removedMember,
        }
    }

    async GetSelectedMember({ groupId, userId }: GetSelectedMemberRequest) {

        const groupData = await this.groupRepositorie.getGroupByGroupBy(groupId);

        if (!groupData) throw new InvalidGroupIdError();

        const member = await this.groupRepositorie.getMemberByUserId({ groupId, userId });

        if (!member) throw new MemberNotFound();

        if (!member.user_select_id) throw new UserNotDraw();

        return {
            userSelectId: member.user_select_id
        }

        // const isMember = await this.groupRepositorie.getMemberByMemberId(memberId);

        // if (!isMember) throw new MemberNotFound();

        // if (isMember.user_id !== userId) throw new CredentialsInvaliedError();

        // if (!isMember.user_select_id) throw new UserNotDraw();

        // return {
        //     userSelectId: isMember.user_select_id,
        // }
    }
}