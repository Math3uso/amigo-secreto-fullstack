"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GroupQuery, Member } from "@/api/group-query";
import { CardGroup } from "./card-groups";
import { Loader2 } from "lucide-react";

export const GroupContent = () => {

    const [groupsData, setGroupsData] = useState<Member[]>([]);

    const { isError, data, isFetching } = useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const res = await GroupQuery.getGroupsByMemberId();
            setGroupsData(res);
            return res;
        }
    });

    const handleAllGroups = () => {
        setGroupsData(data as Member[]);
    }

    const handleGetGroupsAdm = () => {
        if (!data) return;
        const newList = data.filter(current => current.role == "ADMIN");
        setGroupsData(newList);
    }

    const handleGetGroupsMember = () => {
        if (!data) return;
        const newList = data.filter(current => current.role !== "ADMIN");
        setGroupsData(newList);
    }

    return (
        <div className="mt-3">
            <Tabs defaultValue="all">
                <TabsList className=" max-lg:m-auto">
                    <TabsTrigger value="all" onClick={handleAllGroups}>
                        Todos
                    </TabsTrigger>
                    <TabsTrigger value="adm" onClick={handleGetGroupsAdm}>
                        Administrados por mim
                    </TabsTrigger>
                    <TabsTrigger value="member" onClick={handleGetGroupsMember}>
                        Participo
                    </TabsTrigger>
                </TabsList>
                {isFetching &&
                    <div className="p-5">
                        <Loader2 className="animate-spin" />
                    </div>
                }
                {!isFetching &&
                    <>
                        <TabsContent value="all" className="mt-5 flex gap-5 flex-wrap max-lg:justify-center">
                            {data && groupsData.map(el => (
                                <CardGroup key={el.Group.id} member={el} />
                            ))}
                        </TabsContent>
                        <TabsContent value="adm" className="mt-5 flex gap-5 flex-wrap max-lg:justify-center">
                            {data && groupsData.map(el => (
                                <CardGroup key={el.Group.id} member={el} />
                            ))}
                        </TabsContent>
                        <TabsContent value="member" className="mt-5 flex gap-5 flex-wrap max-lg:justify-center">
                            {data && groupsData.map(el => (
                                <CardGroup key={el.Group.id} member={el} />
                            ))}
                        </TabsContent>
                    </>
                }
            </Tabs>
        </div>
    );
}