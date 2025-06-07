import { Check, X } from "lucide-react";
import { toast } from "sonner";

type Props = {
    message: string;
    description?: string;
    error?: boolean;
}

export function AppToast({ message, description, error = false }: Props) {
    toast(message, {
        position: "top-center",
        description: description,
        icon: error ? <X className="w-4 text-red-400" /> : <Check className="w-4 text-green-400" />,
    });
}