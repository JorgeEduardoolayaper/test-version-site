import { Game } from "../../types/game";

const matchString = (subject: string, needle?: string): boolean => {
    if (!needle) {
        return true;
    }    
    
    if (!subject) {
        return false;
    }    
    
    return subject.toLowerCase().includes(needle);
};

export const filterGame = (
    game: Game,
    search: string,
): boolean => {
    if (search) {
        return matchString(game.teamAway, search) ||
            matchString(game.teamHome, search);
    }
    return true;
};