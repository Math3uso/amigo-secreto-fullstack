"use client";
import Link from "next/link";
import { MTextField } from "../_components/m-text-filed";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { registerDataSchema, RegisterhData } from "@/@schemas/register-schema";
import { useMutation } from "@tanstack/react-query";
import { Auth } from "@/api/auth-query";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { AppToast } from "@/components/app-toast";

export default function Page() {

    const { handleSubmit, control, formState: { errors } } = useForm<RegisterhData>({
        resolver: zodResolver(registerDataSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const handleRegister: SubmitHandler<RegisterhData> = async (data) => {
        requestRegister.mutate({ ...data });
    }

    const requestRegister = useMutation({
        mutationFn: async ({ name, email, password }: RegisterhData) => {
            return await Auth.register({ name, email, password });
        },
        onSuccess: (data) => {
            AppToast({ message: "Conta criada" });
            setTimeout(() => {
                redirect("/auth");
            }, 500);
        },
        onError: (data) => {
            AppToast({
                message: "Erro ao criar conta",
                description: data.message,
                error: true
            });
        }
    });

    return (
        <div className="w-screen h-[100dvh] flex justify-center items-center bg-white text-black">
            <form onSubmit={handleSubmit(handleRegister)} className="p-3 max-w-[350px] w-full">
                <h1 className="text-3xl font-bold mb-7 text-center">
                    Crie uma conta
                </h1>
                <div className="flex flex-col gap-5">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <MTextField
                                label="Nome"
                                error={errors.name ? true : false}
                                errorText={errors.name?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <MTextField
                                label="E-mail"
                                type="email"
                                error={errors.email ? true : false}
                                errorText={errors.email?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <MTextField label="Senha"
                                password={true}
                                error={errors.password ? true : false}
                                errorText={errors.password?.message}
                                {...field}
                            />
                        )}
                    />
                    <button type="submit" className="p-4 border rounded-lg cursor-pointer hover:bg-primary/80 transition-all font-bold text-sm flex justify-center bg-primary text-white">
                        {requestRegister.isPending ? < Loader2 /> : "Cadastrar"}
                    </button>
                </div>
                <div className="text-center mt-5">
                    <span className="text-sm font-bold">
                        Já tem uma conta?
                        <Link href={"/auth/"} className="m-2 text-indigo-400">
                            Entrar
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
}