import { Member } from "@/api/group-query";
import { InvitationRequest } from "./invitation";

export type GroupContent = {
    id: string;
    title: string;
    description: string;
    max_value: number;
    min_value: number;
    date: string;
    members: Member[];
    Invitation?: InvitationRequest;
    start: boolean;
}