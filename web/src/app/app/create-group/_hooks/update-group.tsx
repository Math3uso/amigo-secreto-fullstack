"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { toastError, toastOk } from "../toast-options";
import { GroupQuery } from "@/api/group-query";
import { GroupUpdate } from "@/@schemas/group-create-schema";
import { AppToast } from "@/components/app-toast";

export function useUpdateGroup() {
    const { push } = useRouter();

    return useMutation({
        mutationFn: async (data: GroupUpdate) => await GroupQuery.updateGroup(data),
        onSuccess: () => {
            AppToast({ message: "Grupo atualizado com sucesso" });
            setTimeout(() => {
                push("/app/groups");
            }, 500);
        },
        onError: (data) => {
            AppToast({
                message: "Erro ao atualizar",
                description: data.message,
                error: true,
            });
        },
    });
}
