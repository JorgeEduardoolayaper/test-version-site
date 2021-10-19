import moment from "moment";
import { PendingOdd, PendingOddType, GamePeriod } from "../../types/window";
import { Game } from "../../types/game";
import { DeepReadonly } from "../../../general/types/types";
import { EventOdd } from "../../types/eventodd";

export const americanToDecimalOdd = (odd: number): number => (odd < 0 ? 100 / -odd : odd / 100);

export const calculateWinFromAmericanOdd = (americanOdd: number, wager: number): number =>
    americanToDecimalOdd(americanOdd) * wager;

export const calculateWagerFromWin = (americanOdd: number, win: number): number =>
    win / americanToDecimalOdd(americanOdd);

export const computeOddDictKey = (betType: string, period: GamePeriod): string => {
    return [betType, period].join("_");
};

export const getOdd = (
    pendingOdd: DeepReadonly<PendingOdd>,
    oddsMap: Map<string, EventOdd>,
): EventOdd | undefined => {
    let odd;
    if (oddsMap) {
        let key: string = computeOddDictKey(pendingOdd.type, pendingOdd.period);
        if (oddsMap.has(key)) {
            odd = oddsMap.get(key);
        }
    }
    return odd;
};

export const getPendingOddTeam = (
    pendingOdd: DeepReadonly<PendingOdd>,
    game: DeepReadonly<Game>,
): string | null => {
    switch (pendingOdd.type) {
        case PendingOddType.MoneyLineHome:
        case PendingOddType.SpreadHome:
            return game.teamHome;

        case PendingOddType.MoneyLineAway:
        case PendingOddType.SpreadAway:
            return game.teamAway;

        default:
            return null;
    }
};

export const signedNumber = (value: string | number): string =>
    `${Number(value) > 0 ? "+" : ""}${value}`;

export const diffHumanReadable = (value: string): string => {
    const date = moment(value);

    if (!date.isValid()) {
        return "n/a";
    }

    if (date.isBefore()) {
        return "Started";
    }

    return date.fromNow();
};
