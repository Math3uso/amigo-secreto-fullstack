import { GroupQuery } from "@/api/group-query";
import { AppToast } from "@/components/app-toast";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export function useReleaveGroup(id: string) {
    return useMutation({
        mutationFn: async () => await GroupQuery.leaveGroup(id),
        onSuccess: () => {
            AppToast({ message: "você saiu deste grupo" });
            setTimeout(() => {
                redirect("/app/groups");
            }, 300);
        },
        onError: (error) => {
            AppToast({
                message: "Erro ao sair do grupo",
                description: error.message,
                error: true,
            });
        }
    });
}