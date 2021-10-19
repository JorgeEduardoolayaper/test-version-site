import {
    BetTypeTab,
    GamePeriodTab,
    TournamentInfoTab,
    PendingOdd,
    StorableWindow,
    StorableChatWindow,
} from "../../types/window";

export const mapStorableWindow = (data: any): StorableWindow => ({
    id: data.id,
    selectedSportIds: data.selectedSportIds ?? [],
    selectedBetTypeTab: data.selectedBetTypeTab ?? BetTypeTab.Pending,
    selectedTournamentInfoTab: data.selectedTournamentInfoTab ?? TournamentInfoTab.Games,
    parlayWager: data.parlayWager,
    pendingOdds: (data.pendingOdds ?? []).map(mapPendingOdd),
    selectedGamePeriodTab: data.selectedGamePeriodTab ?? GamePeriodTab.FullTime,
});

export const mapStorableChatWindow = (data: any): StorableChatWindow => ({
    id: data.id,
});

export const mapPendingOdd = (data: any): PendingOdd => ({
    tournamentEventId: data.tournamentEventId,
    externalId: data.externalId ?? data.eventId,
    oddId: data.oddId,
    period: data.period,
    type: data.type,
    odd: data.odd,
    wager: data.wager,
});