"use client";

import { GroupQuery, Member, RemoveMemberRequest } from "@/api/group-query";
import { AppToast } from "@/components/app-toast";
import { ConfirmAction } from "@/components/confirm-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    member: Member;
    admin: boolean;
}

export const ItemMember = ({ member, admin }: Props) => {

    const client = useQueryClient();

    const removedUserRequest = useMutation({
        mutationFn: async (data: RemoveMemberRequest) => GroupQuery.removeMemberByMemberId(data),
        onError: (error) => {
            AppToast({ message: error.message, error: true });
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["groupInfoData"] });
        }
    });

    return (
        <div className={`flex items-center gap-3 p-3 border-b`}>
            <span className="w-12 h-10 shrink rounded-full bg-secondary flex items-center justify-center relative">
                {member.user.name.charAt(0)}
            </span>
            <div className="flex items-center justify-between w-full">
                <p>{member.user.name}</p>
                {member.role == "ADMIN" && <Badge className="bg-primary/10 text-primary">Admin</Badge>}
                {admin && member.role !== "ADMIN" &&
                    <ConfirmAction
                        title={`Remover ${member.user.name}?`}
                        onConfirm={() => removedUserRequest.mutate({ groupId: member.groupId, memberId: member.id })}
                    >
                        <Button variant={"ghost"}>remover</Button>
                    </ConfirmAction>
                }
            </div>
        </div>
    );
}