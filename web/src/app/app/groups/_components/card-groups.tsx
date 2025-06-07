import { Member } from "@/api/group-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentGroup } from "@/contexts/group-update-context";
import { Calendar, Edit, GiftIcon, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DrawnLabel } from "./drawn-label";

type Props = {
    member: Member;
}

export const CardGroup = ({ member }: Props) => {

    const dateConvert = new Date(member?.Group.date as string);
    const formatted = dateConvert.toLocaleDateString('pt-BR');

    const { addCurrentGroup } = useCurrentGroup();

    const handleUpdateGroup = (member: Member) => {
        addCurrentGroup(member.Group);
        redirect("/app/create-group?update=true");
    }

    return (
        <Card className="w-[380px] cursor-pointer">
            <CardHeader className="relative">
                <CardTitle className="text-2xl text-primary truncate w-[90%] flex gap-4">
                    <span>{member?.Group.title}</span>
                    {member.Group.start && <DrawnLabel />}
                </CardTitle>
                <Button className="absolute top-0 right-3.5" variant={"ghost"} onClick={() => handleUpdateGroup(member)}>
                    <Edit className="text-muted-foreground" />
                </Button>
                <CardDescription>{member?.Group.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-3 text-muted-foreground ">
                    <Calendar className="w-4" />
                    <span>{formatted}</span>
                </div>
                <div className="flex gap-3 text-muted-foreground mt-4">
                    <Users className="w-4" />
                    <span>{member?.Group.members.length} participantes</span>
                </div>
                <Link href={`/app/groups/${member?.groupId}`}>
                    <Button className="w-full mt-5 cursor-pointer">
                        <GiftIcon />
                        Detalhes
                    </Button></Link>
            </CardContent>
        </Card>
    );
}