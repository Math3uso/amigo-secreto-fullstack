import { BadgeCheck } from "lucide-react";

export const DrawnLabel = () => {
    return (
        <div className="text-xs flex items-center justify-center gap-2 bg-primary/10 rounded-xl px-2">
            <BadgeCheck className="w-4" />
            sorteado
        </div>
    );
}