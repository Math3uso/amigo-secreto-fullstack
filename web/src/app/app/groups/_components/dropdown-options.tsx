"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode, useState } from "react"

type Props = {
    children: ReactNode;
    openDialog: () => void;
}

export const DropDownOptions = ({ children, openDialog }: Props) => {

    const [menuOpen, setMenuOpen] = useState(false);

    const handleCloseMenu = () => {
        setMenuOpen(false);
        openDialog();
    }

    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => redirect("/app/create-group")}>
                        Criar grupo
                        <DropdownMenuShortcut>
                            <Plus className="w-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCloseMenu}>
                        Entrar
                        <DropdownMenuShortcut>
                            <Users className="w-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}