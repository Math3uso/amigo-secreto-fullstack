"use client";
import { InvitationQuery } from "@/api/invitation-query";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Mail, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

type Props = {
    params: Promise<{ id: string }>
}

export default function Page({ params }: Props) {

    const { id } = use(params);
    const router = useRouter();

    const { data, isFetching, isError, error, isSuccess } = useQuery({
        queryKey: ['groupInfoData'],
        queryFn: async () => await InvitationQuery.acceptInvitation(id),
        retry: false,

    });

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-96">
                <CardHeader className="flex flex-col items-center gap-5">
                    {isFetching && <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>}
                    {isError && <X className="size-10 text-red-400" />}
                    {data && <CheckCircle className="size-10 text-green-400" />}
                    <CardTitle className="text-xl">
                        {isFetching && "Carregando convite..."}
                        {isError && error.message}
                    </CardTitle>
                    <CardDescription className="text-center">
                        Estamos buscando detalhes sobre este convite, para que consiga entrar no grupo
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="border p-5 rounded-lg flex justify-center items-center gap-2 text-muted-foreground">
                        {isFetching && <>  <Mail /> <p>analisando codigo do convite</p></>}
                        {isError && <>  <X /> <p>Erro</p></>}
                        {data && <Button onClick={() => router.push("/app/groups")}>clique para acessar</Button>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}