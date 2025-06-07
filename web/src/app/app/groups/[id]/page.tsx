import { ContentGroup } from "./_components/content";
import { cookies } from "next/headers";

type Props = {
    params: Promise<{ id: string }>
}

export default async function page({ params }: Props) {

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value as string;

    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/member/me`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ groupId: id })
    });

    const data = res.status;

    const isAdmin = data == 200 ? true : false;

    return (
        <div className="mt-8 w-full grid lg:grid-cols-3 gap-3 max-2xl:p-5">
            <ContentGroup id={id} isAdmin={isAdmin} />
        </div>
    );
}