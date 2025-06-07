import { Member } from "generated/prisma";
import { randomUUID } from "node:crypto";

const members: Member[] = [
    {
        groupId: "123123",
        id: "1",
        role: "ADMIN",
        user_id: randomUUID(),
        user_select_id: null
    },
    {
        groupId: "123123",
        id: "2",
        role: "USER",
        user_id: randomUUID(),
        user_select_id: null
    },
    {
        groupId: "123123",
        id: "3",
        role: "USER",
        user_id: randomUUID(),
        user_select_id: null
    },
    {
        groupId: "123123",
        id: "4",
        role: "USER",
        user_id: randomUUID(),
        user_select_id: null
    },
];

export function drawMembers(members: Member[]) {
    let usersPossible = members;
    let random: Member[] = [];

    do {
        random = [...usersPossible].sort(() => Math.random() - 0.5);
    } while (random.some((member, i) => member.id === usersPossible[i].id));

    return members.map((member, i) => ({
        ...member,
        user_select_id: random[i].id
    }));
};