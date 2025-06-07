"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DrawMembers } from "./draw-members";
import { GroupHeader } from "./group-header";
import { ListMembers } from "./list-members";
import { GroupQuery } from "@/api/group-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, OctagonX } from 'lucide-react';

type Props = {
    id: string;
    isAdmin: boolean;
}

export const ContentGroup = ({ id, isAdmin }: Props) => {

    const { data, isFetching, isError, error } = useQuery({
        queryKey: ['groupInfoData'],
        queryFn: async () => await GroupQuery.getInfoGroup(id),
        retry: false,
    });

    if (isError) {
        return (
            <Alert variant={"destructive"}>
                <OctagonX className="h-4 w-4" />
                <AlertTitle>Grupo não encontrado {error.message}</AlertTitle>
                <AlertDescription>
                    verifique se as informaçõs então corretas e tente novamente
                </AlertDescription>
            </Alert>
        )
    }

    if (isFetching) {
        return (
            <Loader2 className="animate-spin" />
        );
    }

    return (
        <>
            <div className="lg:col-span-2">
                <GroupHeader admin={isAdmin} id={id} />
                <DrawMembers admin={isAdmin} />
            </div>
            <ListMembers admin={isAdmin} />
        </>
    );
}