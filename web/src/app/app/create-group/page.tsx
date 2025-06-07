import { Suspense } from "react";
import { GroupCreateForm } from "./_components/group-create-form";

// interface PageProps {
//     searchParams: { [key: string]: string | string[] | undefined };
// }

export default function Page() {
    return (
        <div className="flex justify-center flex-col items-center">
            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold mb-3">Criar novo Grupo</h1>
                <span className="">crie quantos grupos quiser com poucos passos</span>
                <Suspense fallback={<div>Carregando...</div>}>
                    <GroupCreateForm isUpdate={false} />
                </Suspense>
            </div>
        </div>
    );
}