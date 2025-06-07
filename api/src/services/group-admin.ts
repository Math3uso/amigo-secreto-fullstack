import { GroupRepositorie } from "@/repositories/group-repositorie";
import { Invitation } from "generated/prisma";
import { nanoid } from "nanoid";
import { MemberNotFound } from "./errors/member-not-found-error";
import { RemovingMemberError } from "./errors/removed-member-error";
import { EmpetyGroupError } from "./errors/empty-group-error";
import { NoEnoughMembersError } from "./errors/no-enough-members-error";
import { drawMembers } from "@/utils/draw-members";

interface GroupServiceUpdateInfo {
    groupId: string;
    title: string;
    description?: string;
    max_value: number;
    min_value: number;
    date: string;
}

interface GroupServiceInvite {
    groupId: string;
}

interface GroupSericeResponse {
    invitation: Invitation;
    update: boolean;
}


export class GroupAdminService {

    constructor(private groupRepositorie: GroupRepositorie) { }

    async createInvitation({ groupId }: GroupServiceInvite): Promise<GroupSericeResponse> {

        //const isValidGroupId = await this.groupRepositorie.getGroupByGroupBy(groupId);
        const now = new Date();
        const time = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias

        //if (!isValidGroupId) throw new InvalidGroupIdError();
        const currentInvite = await this.groupRepositorie.getInviteByGroupId(groupId);

        if (currentInvite) {
            const updateInvite = await this.groupRepositorie.updateInviteByGroupId({
                groupId,
                newInvite: { ...currentInvite, id: nanoid(10) }
            });
            return { invitation: updateInvite, update: true };
        }
        const invitation = await this.groupRepositorie.createInvitation({ groupId, time, id: nanoid(10) });

        return {
            invitation,
            update: false,
        };
    }

    async updateInfoGroup({ groupId, title, description, date, max_value, min_value }: GroupServiceUpdateInfo) {
        const updatedGroup = await this.groupRepositorie.updateInfoGroup({ groupId, title, description, date, max_value, min_value });
        return {
            updatedGroup,
        }
    }

    async removeMember(memberId: string, userId: string) {

        const memberRemoved = await this.groupRepositorie.getMemberByMemberId(memberId);

        if (!memberRemoved) throw new MemberNotFound();

        if (memberRemoved?.user_id === userId) {
            throw new RemovingMemberError();
        }
        const removedMember = await this.groupRepositorie.removeMemberByMemberId(memberId);
        return {
            removedMember,
        }
    }

    async start(groupId: string) {
        const members = await this.groupRepositorie.getAllMembersByGroupId(groupId);
        if (members.length == 0) {
            throw new EmpetyGroupError();
        }

        if (members.length % 2 !== 0) {
            throw new NoEnoughMembersError();
        }
        const res = drawMembers(members);

        const users = await this.groupRepositorie.setAllMembersSelectIdByMemberId(res);
        await this.groupRepositorie.startGroup(groupId);
        return {
            users,
        }
    }

    async getInfoGroup(groupId: string) {
        const groupInfo = await this.groupRepositorie.getInfoGroupByGroupId(groupId, true);
        return {
            groupInfo,
        }
    }

    async deletedGroup(groupId: string) {
        const removedGroup = await this.groupRepositorie.deleteGroupByGroupId(groupId);
        return {
            removedGroup,
        }
    }
}