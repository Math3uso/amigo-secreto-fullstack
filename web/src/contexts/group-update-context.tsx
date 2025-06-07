"use client";
import { GroupContent } from "@/@types/group";
import { createContext, ReactNode, useContext, useState } from "react";

type Context = {
    group?: GroupContent;
    addCurrentGroup: (newMember: GroupContent) => void;
    clearCurrentGroup: () => void;
}


export const CurrentGroupContext = createContext({} as Context);

export const CurrentGroupProvider = ({ children }: { children: ReactNode }) => {

    const [group, setGroup] = useState<GroupContent>();

    const addCurrentGroup = (newMember: GroupContent) => {
        setGroup(newMember);
    }

    const clearCurrentGroup = () => {
        setGroup(undefined);
    }

    return (
        <CurrentGroupContext.Provider value={{ group, addCurrentGroup, clearCurrentGroup }}>
            {children}
        </CurrentGroupContext.Provider>
    );
}

export const useCurrentGroup = () => useContext(CurrentGroupContext);