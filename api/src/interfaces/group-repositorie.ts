import { Group, Invitation, Member, Prisma } from "generated/prisma";

export interface InvitationRequest {
    id: string;
    groupId: string;
    time: Date;
}

export interface UpdateInviteRequest {
    groupId: string;
    newInvite: Invitation;
}

export interface CreateMemberRequest {
    userId: string;
    groupId: string;
}

export interface UpdateGroupInfoRequest {
    groupId: string;
    title: string;
    description?: string;
    max_value: number;
    min_value: number;
    date: string;
}


export interface DataMemberRequest {
    userId: string;
    groupId: string;
}

export interface GetGroupRequest {

}

export interface MemberRequest {
    userId: string;
    groupId: string;
}

export interface IGroupRepositorie {
    create(data: Prisma.GroupCreateInput): Promise<Group>;
    createMemberAdmin(userId: string, groupId: string): Promise<Member>;
    createInvitation(data: InvitationRequest): Promise<Invitation>;
    getGroupByGroupBy(groupId: string, invite?: boolean): Promise<Group | null>;
    // findAllInvitateByGroupId(groupId: string): Promise<Group[]>;
    updateInviteByGroupId(data: UpdateInviteRequest): Promise<Invitation>;
    getInviteByGroupId(groupId: string): Promise<Invitation | null>;
    getIviteByInviteId(inviteId: string): Promise<Invitation | null>;
    createMember(data: CreateMemberRequest): Promise<Member>;
    updateInfoGroup(data: UpdateGroupInfoRequest): Promise<Group>;
    getMemberByMemberId(memberId: string): Promise<Member | null>;
    removeMemberByMemberId(memberId: string): Promise<Member | null>;
    getAllMembersByGroupId(groupId: string): Promise<Member[]>;
    setAllMembersSelectIdByMemberId(members: Member[]): Promise<Member[]>;
    getInfoGroupByGroupId(groupId: string, inviti?: boolean): Promise<any>;
    deleteGroupByGroupId(groupId: string): Promise<Group>;
    getMemberByUserId(data: MemberRequest): Promise<Member | null>;
    startGroup(groupId: string): Promise<Group | null>;
}