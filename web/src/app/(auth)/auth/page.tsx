"use client";
import Link from "next/link";
import { MTextField } from "../_components/m-text-filed";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthData, authDataSchema } from "@/@schemas/auth-shema";
import { Auth } from "@/api/auth-query";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppToast } from "@/components/app-toast";

export default function Page() {

    const { handleSubmit, control, formState: { errors }, getValues } = useForm<AuthData>({
        resolver: zodResolver(authDataSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { push } = useRouter();

    const handleLogIn: SubmitHandler<AuthData> = async (data) => {
        const { email, password } = data;
        requestAuth.mutate({ email, password });
    }

    const requestAuth = useMutation({
        mutationFn: async ({ email, password }: AuthData) => {
            return await Auth.execute({ email, password });
        },
        onSuccess: (data) => {
            AppToast({ message: "usuario logado" });
            setTimeout(() => {
                push("/app");
            }, 500);

        },
        onError: (data) => {
            AppToast({
                message: "Erro na atenticação",
                description: data.message,
                error: true
            });
        }
    });

    return (
        <div className="w-screen h-[100dvh] flex justify-center items-center bg-white text-black">
            <form onSubmit={handleSubmit(handleLogIn)} className="p-3 max-w-[350px] w-full">
                <h1 className="text-3xl font-bold mb-7 text-center">
                    Bem vindo de volta
                </h1>

                <div className="flex flex-col gap-5">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <MTextField
                                type="email"
                                label="E-mail"
                                error={errors.email ? true : false}
                                {...field}
                            />
                        )}
                    >

                    </Controller>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <MTextField
                                label="Senha"
                                password={true}
                                errorText={errors.password?.message}
                                error={errors.password ? true : false}
                                {...field}
                            />
                        )}
                    >
                    </Controller>
                    <button type="submit" className="p-4 border rounded-lg cursor-pointer bg-primary text-white hover:bg-primary/80 transition-all font-bold text-sm flex justify-center">
                        {requestAuth.isPending ? < Loader2 /> : "Entrar"}
                    </button>
                </div>
                <div className="text-center mt-5">
                    <span className="text-sm font-bold">
                        Não tem uma conta?
                        <Link href={"/register"} className="m-2 text-indigo-400">
                            Criar
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
}