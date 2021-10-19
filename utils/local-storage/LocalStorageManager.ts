import { StorableWindow, StorableChatWindow } from "../../types/window";
import { mapStorableWindow, mapStorableChatWindow } from "./mappings";

const TABS_KEY = "tabs";

export const saveWindows = (data: StorableWindow[]): void => {
    localStorage.setItem(TABS_KEY, JSON.stringify(data));
};

export const getWindows = (): StorableWindow[] => {
    const content = localStorage.getItem(TABS_KEY);
    return content ? JSON.parse(content).map(mapStorableWindow) : [];
};

export const getChatWindows = (): StorableChatWindow[] => {
    const content = localStorage.getItem(TABS_KEY);
    return content ? JSON.parse(content).map(mapStorableChatWindow) : [];
};
