"use client";

import { GroupQuery } from "@/api/group-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { ReactNode, useState } from "react"
import { toastOk } from "../../create-group/toast-options";

type Props = {
    children: ReactNode;
    changeDialog: (open: boolean) => void;
    open: boolean;
}

export const JoinGroupDialog = ({ children, changeDialog, open }: Props) => {

    const [invitation, setInvitation] = useState("");

    const queryClient = useQueryClient();

    const invitationRequest = useMutation({
        mutationFn: async () => GroupQuery.acceptInvitation(invitation),
        onError: (erro) => {
            console.log(erro);
        },
        onSuccess: async () => {
            toastOk({ message: "Convite aceito", icon: <Check className="w-4 text-green-400" /> });
            await queryClient.invalidateQueries({ queryKey: ["groups"] });
        }
    });

    const handleJoinGroup = async () => {
        invitationRequest.mutate();
    }

    return (
        <Dialog open={open} onOpenChange={changeDialog}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Entrar em um novo grupo</DialogTitle>
                    <DialogDescription>
                        coloque o codigo do grupo aqui.
                    </DialogDescription>
                    <p className="text-red-400">{invitationRequest.error?.message}</p>
                </DialogHeader>
                <div className="flex gap-5">
                    <Input onChange={evt => setInvitation(evt.target.value)} placeholder="Ex: 12345" />
                    <Button onClick={handleJoinGroup}>
                        {invitationRequest.isPending ? <Loader2 className="animate-spin w-4" /> : "Entrar"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}