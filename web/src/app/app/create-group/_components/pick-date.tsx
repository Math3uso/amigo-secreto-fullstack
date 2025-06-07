import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

type Props = {
    onSelected: (date: Date | undefined) => void;
    select: Date;
}

export const PickDate = ({ onSelected, select }: Props) => {
    return (
        <Popover>
            <PopoverTrigger className="w-full" asChild>
                <Button variant={"outline"} className="w-full flex justify-start p-5">
                    <CalendarIcon /> {select ? format(select, "PPP") : "Selecione uma data"}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    initialFocus
                    onSelect={(date) => {
                        onSelected(date);
                    }}
                    selected={select}
                    disabled={(date) => date < new Date()}
                />
            </PopoverContent>
        </Popover>
    );
}