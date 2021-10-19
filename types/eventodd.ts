import { GamePeriod, PendingOddType } from "../types/window";
export interface EventOdd {
    oddId: number;
    period: GamePeriod;
    betType: PendingOddType;
    odd: number;
    handicap: string;
}

export interface EventOddCollection {
    external_id: string;
    count: number;
    odds: EventOdd[];
}
