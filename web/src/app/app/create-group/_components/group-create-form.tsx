"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PickDate } from "./pick-date";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupCreate, groupCreateSchema, GroupUpdate } from "@/@schemas/group-create-schema";
import { GroupCreateError } from "./group-create-error";
import { Suspense, useEffect } from "react";
import { useCurrentGroup } from "@/contexts/group-update-context";
import { useCreateGroup } from "../_hooks/create-group";
import { useUpdateGroup } from "../_hooks/update-group";

export type Params = {
    isUpdate: boolean;
}

export const GroupCreateForm = ({ isUpdate }: Params) => {

    console.log(isUpdate);

    const { push } = useRouter();
    const update = useSearchParams().get('update');
    const { group, clearCurrentGroup } = useCurrentGroup();

    const { mutate: createGroup } = useCreateGroup();

    const { mutate: updateGroup } = useUpdateGroup();

    useEffect(() => {
        if (!update) {
            clearCurrentGroup();
        }
    }, []);

    const { handleSubmit, control, register, formState: { errors } } = useForm<GroupCreate>({
        resolver: zodResolver(groupCreateSchema),
        defaultValues: group ? {
            title: group.title,
            description: group.description,
            date: new Date(group.date),
            maxValue: String(group.max_value),
            minValue: String(group.min_value)
        } : {}

    });


    const handleCreateGroup: SubmitHandler<GroupCreate> = async (data) => {
        if (update && group) {
            const newData: GroupUpdate = {
                ...data,
                groupId: group.id
            }
            updateGroup(newData);
            return;
        }
        data.date.toString();
        createGroup(data);
        //createGroup.mutate(data);
    }
    return (
        <form
            onSubmit={handleSubmit(handleCreateGroup)}
            className="max-w-[550px] w-full mt-10 lg:border shadow-md rounded-lg p-5">
            <div className="p-3">
                <Label className="ml-1 mb-2">Nome do grupo</Label>
                <GroupCreateError error={errors.title ? errors.title.message as string : ""} />
                <Input {...register('title')} placeholder="Ex: alguma coisa..." className="p-5" />
            </div>
            <div className="p-3">
                <Label className="ml-1 mb-2">Descrição do grupo</Label>
                <Textarea
                    {...register('description')}
                    placeholder="Detalhes do grupo, regras..."
                />
            </div>
            <div className="p-3">
                <Label className="ml-1 mb-2">Data do evento</Label>
                <GroupCreateError error={errors.date ? errors.date.message as string : ""} />
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <PickDate
                            onSelected={field.onChange}
                            select={field.value}
                        />
                    )}
                />
            </div>
            <div className="p-3 flex gap-5">
                <Input {...register('maxValue')} placeholder="Valor maximo" type="number" />
                <Input {...register('minValue')} placeholder="Valor minimo" type="number" />
            </div>
            <div className="flex justify-between gap-5 p-[5px] mt-3">
                <Button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => push("/app/groups")}
                    variant={"outline"}>
                    Cancelar
                </Button>
                <Button className="cursor-pointer">{update ? "Editar grupo" : "Criar grupo"}</Button>
            </div>
        </form>
    );
}