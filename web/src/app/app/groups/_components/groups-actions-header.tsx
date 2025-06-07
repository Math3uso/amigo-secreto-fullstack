"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JoinGroupDialog } from "./join-group-dialog";
import { DropDownOptions } from "./dropdown-options";
import { useState } from "react";

export function GroupsActionsHeader() {

    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    }

    return (
        <div className="flex gap-3 max-lg:justify-center lg:pr-40 items-center">
            <div className="w-full">
                <Input placeholder="Buscar grupos" className="lg:w-[230px] w-full my-3 lg:my-0" />
            </div>
            <DropDownOptions openDialog={handleOpenDialog}>
                <Button>
                    Opções
                </Button>
            </DropDownOptions>
            <JoinGroupDialog changeDialog={setOpen} open={open}>
                <p></p>
            </JoinGroupDialog>
        </div>
    );
};