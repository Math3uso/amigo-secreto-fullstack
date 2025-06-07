import { GroupContent } from "./_components/group-content";
import { GroupsActionsHeader } from "./_components/groups-actions-header";

export default function Page() {
    return (
        <div className="p-2">
            <header className="flex justify-between mt-5 flex-col lg:flex-row">
                <h1 className="text-3xl font-bold max-lg:text-center">Meus grupos</h1>
                <GroupsActionsHeader />
            </header>
            <GroupContent />
        </div>
    );
}