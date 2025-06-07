"use client";
import { GroupContent } from "@/@types/group";
import { UserNotDraw } from "@/api/errors/user-not-draw";
import { GroupQuery } from "@/api/group-query";
import { AppToast } from "@/components/app-toast";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Gift, Shuffle } from "lucide-react";
import { useState } from "react";

export const DrawMembers = ({ admin }: { admin: boolean }) => {

    const client = useQueryClient();
    const cacheData = client.getQueryData(['groupInfoData']) as GroupContent;
    const [userSelect, setUserSelect] = useState("");

    const startRequest = useMutation({
        mutationFn: async () => await GroupQuery.start(cacheData.id),
        onSuccess: async () => {
            await client.refetchQueries({ queryKey: ['userSelect'] });
            const userSelect = cacheData.members.find(member => member.id == data?.userSelectId);
            setUserSelect(userSelect?.user.name as string);
        },
        onError: (error) => {
            AppToast({ message: error.message, error: true });
        }
    });

    const { data, isFetching, isError, error, isSuccess } = useQuery({
        queryKey: ["userSelect"],
        queryFn: async () => await GroupQuery.getUserSelect(cacheData.id),
        retry: false,
    });

    const getUserSelect = () => {

        const userSelect = cacheData.members.find(member => member.id == data?.userSelectId);

        return userSelect?.user.name as string | undefined;
    }

    return (
        <div className="border p-5 rounded-lg">
            <div>
                <h2 className="text-xl mb-3 font-bold">Seu Amgio Secreto</h2>
                {error && error instanceof UserNotDraw &&
                    <span className="text-muted-foreground">sorteio ainda não foi realizado</span>
                }
            </div>
            <div className="flex flex-col justify-center items-center gap-5 pb-8">
                {isSuccess &&
                    <div className="flex flex-col items-center">
                        <span className="text-lg font-medium">Seu amigo secreto é:</span>
                        <span className="size-16 shrink rounded-full bg-secondary flex items-center justify-center relative text-2xl mt-3">
                            {getUserSelect ? getUserSelect()?.charAt(0) : userSelect}
                        </span>
                        <span className="text-2xl text-primary mt-3">{getUserSelect()}</span>
                    </div>
                }
                {isError && admin &&
                    <>
                        <Gift className="size-[64px] text-muted-foreground" />
                        <span>Aguardando sortetio para revelar seu amigo secreto</span>
                        < Button onClick={() => startRequest.mutate()}>
                            <Shuffle />
                            Realizar Sorteio
                        </Button>
                    </>
                }
            </div>
        </div >
    );
}