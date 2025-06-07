import { Home, Plus, Users } from "lucide-react";

export const routes = [
    {
        title: "Inicio",
        url: "/app",
        icon: Home,
    },
    {
        title: "Meus grupos",
        url: "/app/groups",
        icon: Users,
    },
    {
        title: "Criar",
        url: "/app/create-group",
        icon: Plus,
    },
]