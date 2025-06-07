import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function Page() {
    return (
        <div className="flex gap-3">
            <Input placeholder="Buscar grupos" className="w-[230px]" />
            <Button className="cursor-pointer">
                <Plus />
                Criar grupo
            </Button>
        </div>
    );
}