import { GroupCreate } from "@/@schemas/group-create-schema";
import { base } from "./base";
import { AxiosError } from "axios";
import { GroupContent } from "@/@types/group";
import { InvitationRequest } from "@/@types/invitation";
import { UserSelect } from "@/@types/userSelectId";
import { UserNotDraw } from "./errors/user-not-draw";

export interface Member {
    id: string;
    role: string;
    groupId: string;
    Group: GroupContent;
}

export interface Member {
    id: string;
    role: string;
    user: {
        name: string;
    }
}

export interface RemoveMemberRequest {
    groupId: string;
    memberId: string;
}

export class GroupQuery {
    static async getGroupsByMemberId() {
        try {
            const data = await base.get("/groups", {
                withCredentials: true
            });
            console.log(data);
            return data.data.members as Member[];;
        } catch (error) {
            throw error;
        }
    }

    static async createGroup(group: GroupCreate) {
        try {
            const data = await base.post("/group", { ...group }, {
                withCredentials: true
            });
            console.log(data);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }

    }

    static async updateGroup(group: GroupCreate & { groupId: string }) {
        console.log(group);
        try {
            const data = await base.put("/group", {
                ...group,
            }, {
                withCredentials: true
            });
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }

    static async getInfoGroup(id: string) {
        try {
            const data = await base.post("/group/info", {
                groupId: id
            }, {
                withCredentials: true
            });
            //console.log("group info", data);
            return data.data.groupInfo as GroupContent;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }

    static async MemberIsAdmin(groupId: string) {
        try {
            const data = await base.post("/member/me", {
                groupId
            }, {
                withCredentials: true
            });
            return data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }

    static async getNewInvitation(groupId: string) {
        try {
            const data = await base.post("/group/invite", {
                groupId
            }, {
                withCredentials: true
            });
            return data.data.invite.invitation as InvitationRequest;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }

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

    static async leaveGroup(groupId: string) {
        try {
            const data = await base.delete(`group/releave`, {
                data: { groupId },
                withCredentials: true
            });
            return data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }
    static async deleteGroup(groupId: string) {
        try {
            const data = await base.delete(`group`, {
                data: { groupId },
                withCredentials: true,
            });
            return data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }

    static async removeMemberByMemberId({ groupId, memberId }: RemoveMemberRequest) {
        try {
            const data = await base.delete(`group/member?member=${memberId}`, {
                data: { groupId },
                withCredentials: true,
            });
            return data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }

    static async start(groupId: string) {
        try {
            const data = await base.post(
                `group/start`,
                { groupId },
                { withCredentials: true }
            );
            return data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }

    static async getUserSelect(groupId: string) {
        try {
            const data = await base.post(
                `group/userSelect`,
                { groupId },
                { withCredentials: true }
            );
            const teste: UserSelect = data.data;
            return data.data as UserSelect;
        } catch (error) {
            if (error instanceof AxiosError) {
                const code = error.response?.data?.code;
                if (code === 'USER_NOT_DRAW') {
                    throw new UserNotDraw(error.response?.data.message);
                }
                throw new Error(error.response?.data.message);
            }
        }
    }
}