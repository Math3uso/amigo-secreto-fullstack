import { Check, X } from "lucide-react";
import { ReactNode } from "react";
import { toast } from "sonner";

type Props = {
    message: string;
    description?: string;
    icon: ReactNode;
}

export function toastOk({ message, description, icon }: Props) {
    toast("message", {
        description,
        position: "top-center",
        //style: { background: "#dcfce7" },
        icon,
        duration: 800
    });
}

export function toastError({ message, description, icon }: Props) {
    toast(message, {
        position: "top-center",
        description: description,
        icon,
    });
}