"use client";

import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export const SwitchTheme = () => {
    const { setTheme, theme } = useTheme()
    return (
        <Switch
            checked={theme == "dark"}
            onCheckedChange={() => setTheme(theme == "dark" ? "light" : "dark")}
        />
    );
}