"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type Props = {
    title: string;
    message?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    children: React.ReactNode;
}

export const ConfirmAction = ({ children, title, message, onCancel, onConfirm }: Props) => {


    const [open, setOpen] = useState(false);

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <div className="flexs">
                    <Button onClick={() => setOpen(false)} variant="outline" className="mx-3">Cancelar</Button>
                    <Button onClick={onConfirm} variant={"destructive"}>Confirmar</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}