import { GroupQuery } from "@/api/group-query";
import { AppToast } from "@/components/app-toast";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export function useDeleteGroup(id: string) {
    return useMutation({
        mutationFn: async () => await GroupQuery.deleteGroup(id),
        onError: (error) => {
            AppToast({
                message: "Erro ao deletar grupo",
                description: error.message,
                error: true,
            });
        },
        onSuccess: () => {
            AppToast({ message: "Grupo deletado com sucesso" });
            setTimeout(() => {
                redirect("/app/groups");
            }, 500);
        }
    });
}