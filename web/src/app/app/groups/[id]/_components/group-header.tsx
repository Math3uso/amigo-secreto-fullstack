"use client";
import { GroupContent } from "@/@types/group";
import { GroupQuery } from "@/api/group-query";
import { toastError, toastOk } from "@/app/app/create-group/toast-options";
import { AppToast } from "@/components/app-toast";
import { ConfirmAction } from "@/components/confirm-action";
import { TooltipModel } from "@/components/tooltip-content";
import { Button } from "@/components/ui/button";
import { useCurrentGroup } from "@/contexts/group-update-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, Check, Copy, Edit, Loader2, LogOut, Plus, Share2, Trash, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useReleaveGroup } from "../_hooks/releave-group";
import { useDeleteGroup } from "../_hooks/delete-group";
import { converteDate } from "@/utils/converte-date";

export const GroupHeader = ({ admin, id }: { admin: boolean, id: string }) => {

    const client = useQueryClient();

    const { addCurrentGroup } = useCurrentGroup();
    const [copySuccess, setCopySuccess] = useState(false);
    const [copyInviteSuccess, setCopyInviteSuccess] = useState(false);

    const cacheData = client.getQueryData(['groupInfoData']) as GroupContent;
    const { mutate: releaveGroup } = useReleaveGroup(cacheData.id);
    const { mutate: deleteGroup } = useDeleteGroup(cacheData.id);
    const formatted = converteDate(cacheData.date);

    const handleEditCurrentGroup = () => {
        addCurrentGroup(cacheData);
        redirect("/app/create-group?update=true");
    }

    const invitationRequest = useMutation({
        mutationFn: async () => await GroupQuery.getNewInvitation(cacheData.id),
        onSuccess: () => {
            AppToast({ message: "Convite criado com sucesso" });
        }
    });


    const handleRequestInvitation = async () => {
        await invitationRequest.mutateAsync();
        client.invalidateQueries({ queryKey: ["groupInfoData"] });
    }

    const handleCopyInvitation = async (invitation: string) => {
        try {
            await navigator.clipboard.writeText(invitation);
            setCopySuccess(true);
            setTimeout(() => {
                setCopySuccess(false);
            }, 800);
        } catch (error) {
            alert("erro ao copiar convite");
        }
    }

    const handleShareInvite = async () => {
        const url = `${window.location.origin}/group/${cacheData.Invitation?.id}`;
        await navigator.clipboard.writeText(url);
        setCopyInviteSuccess(true);
        setTimeout(() => {
            setCopyInviteSuccess(false);
        }, 800);
    }

    return (
        <div className="p-5 rounded-lg border mb-5">
            <header className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-medium mb-2">{cacheData.title}</h2>
                    <span className="text-muted-foreground">{cacheData.description}</span>
                </div>
                {admin &&
                    <div className="flex gap-2">
                        <Button onClick={handleEditCurrentGroup} variant={"outline"}>
                            <Edit />
                            Editar
                        </Button>
                        <ConfirmAction
                            title="Deletar Grupo"
                            message="Você tem certeza que deseja deletar o grupo? não sera possivel recuperar novamente."
                            onConfirm={deleteGroup}>
                            <Button variant={"destructive"}>
                                <Trash />
                                Deletar
                            </Button>
                        </ConfirmAction>
                    </div>
                }
                {!admin &&
                    <ConfirmAction title={`Deseja sair do grupo ${cacheData.title}`} onConfirm={releaveGroup}>
                        <Button variant={"destructive"}>
                            Sair
                            <LogOut className="w-4" />
                        </Button>
                    </ConfirmAction>
                }
            </header>
            <div className="text-muted-foreground flex flex-col gap-5 mt-5">
                <div className="flex gap-2">
                    <Calendar />
                    Data do Evento {formatted}
                </div>
                <div className="flex gap-2">
                    <Users />
                    Participantes {cacheData.members.length}
                </div>
                <div className="text-secondary-foreground border rounded-lg p-2 flex justify-between items-center bg-muted max-lg:flex-col max-lg:gap-3">
                    <div>
                        <p className="text-muted-foreground">Código do grupo:
                            <span className="font-bold text-secondary-foreground">
                                {cacheData.Invitation ? ` ${cacheData.Invitation.id}` : " nenhum"}
                            </span>
                        </p>
                    </div>
                    <div>
                        {admin &&
                            <TooltipModel content="novo convite">
                                <Button onClick={handleRequestInvitation} variant={"outline"}>
                                    {invitationRequest.isPending ? <Loader2 className="animate-spin" /> : <Plus />}
                                </Button>
                            </TooltipModel>
                        }
                        <Button
                            disabled={!cacheData.Invitation}
                            onClick={() => handleCopyInvitation(cacheData.Invitation?.id as string)}
                            variant={"outline"}
                            className={`mx-3`}>
                            {copySuccess ? <Check className="text-green-400" /> : <Copy />}
                        </Button>
                        <Button onClick={handleShareInvite} disabled={!cacheData.Invitation} variant={"outline"}>
                            {copyInviteSuccess ? <Check className="text-green-400" /> : <Share2 />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}