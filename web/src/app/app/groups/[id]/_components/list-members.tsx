import { GroupContent } from "@/@types/group";
import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "@tanstack/react-query";
import { ItemMember } from "./member-item";

type Props = {
    admin: boolean;
}

export const ListMembers = ({ admin }: Props) => {

    const client = useQueryClient();
    const cacheData = client.getQueryData(['groupInfoData']) as GroupContent;

    return (
        <div className="border p-5 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Participantes</h3>
            <span className="text-muted-foreground">{cacheData.members.length} pessoas estão nesse grupo</span>
            <div className="mt-3">
                {cacheData.members.map(member => (
                    <ItemMember key={member.id} member={member} admin={admin} />
                ))}
            </div>
        </div >
    );
}