"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GroupQuery } from "@/api/group-query";
import { GroupCreate } from "@/@schemas/group-create-schema";
import { AppToast } from "@/components/app-toast";

export function useCreateGroup() {
    const { push } = useRouter();

    return useMutation({
        mutationFn: async (data: GroupCreate) => await GroupQuery.createGroup(data),
        onSuccess: () => {
            AppToast({ message: "Grupo criado" });
            setTimeout(() => {
                push("/app/groups");
            }, 500);
        },
        onError: (err: any) => {
            AppToast({
                message: "Erro na autenticação",
                description: err?.response?.data?.message || "Erro desconhecido",
                error: true
            });
        },
    });
}
