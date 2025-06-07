import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    label: string;
}

export function TooltipIcon({ children, label }: Props) {
    return (
        <TooltipProvider>
            <Tooltip defaultOpen>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}