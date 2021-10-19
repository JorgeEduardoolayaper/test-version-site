import { League } from "../../../general/types/league";
import { Game } from "../../types/game";

export const groupByLeague = (
    leagueDict: ReadonlyMap<string, League>,
    items: ReadonlyArray<Game>,
    cb: (item: Game) => string,
    cd: (item: Game) => string,
): Record<string, Record<string, Game[]>> => {
    let finalMap: Record<string, Record<string, Game[]>> = {};
    let groupedItems: Record<string, Game[]> = items.reduce((carry, item) => {
        const key = cb(item);
        carry[key] = [...(carry[key] ?? []), item];
        return carry;
    }, {} as Record<string, Game[]>);

    for (let k in groupedItems) {
        let v = groupedItems[k];
        const sortedItems: ReadonlyArray<Game> = v.concat().sort((a, b) => {
            const a_rank = leagueDict?.get(a.leagueId)?.rank ?? 1000;
            const b_rank = leagueDict?.get(b.leagueId)?.rank ?? 1000;
            return a_rank - b_rank;
        });

        let subgroupedItems: Record<string, Game[]> = sortedItems.reduce((carry, item) => {
            const leagueId = cd(item);
            const key: string = leagueDict.get(leagueId)?.group ?? "Unknown";
            carry[key] = [...(carry[key] ?? []), item];
            return carry;
        }, {} as Record<string, Game[]>);
        finalMap[k] = subgroupedItems;
    }
    return finalMap;
};
