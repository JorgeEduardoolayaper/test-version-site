import { UserLevel } from "../../../general/types/user";

const THRESHHOLD_LEVEL_1 = 40000;
const THRESHHOLD_LEVEL_2 = 75000;
const THRESHHOLD_LEVEL_3 = 150000;
const THRESHHOLD_LEVEL_4 = 250000;
const THRESHHOLD_LEVEL_5 = 500000;
const NAME_LEVEL_1 = "AMATEUR";
const NAME_LEVEL_2 = "PRO";
const NAME_LEVEL_3 = "ALL-PRO";
const NAME_LEVEL_4 = "ALL STAR";
const NAME_LEVEL_5 = "LEGEND";

export const findUserLevel = (chipsWon: number): UserLevel => {
    var userLevel = { level: 1, name: NAME_LEVEL_1, percent: 0 } as UserLevel;
    if (chipsWon < THRESHHOLD_LEVEL_1) {
        userLevel = {
            level: 1,
            name: NAME_LEVEL_1,
            percent: Math.floor((chipsWon * 100) / THRESHHOLD_LEVEL_1),
            threshhold: THRESHHOLD_LEVEL_1,
        };
    } else if (chipsWon < THRESHHOLD_LEVEL_2) {
        userLevel = {
            level: 2,
            name: NAME_LEVEL_2,
            percent: Math.floor((chipsWon * 100) / THRESHHOLD_LEVEL_2),
            threshhold: THRESHHOLD_LEVEL_2,
        };
    } else if (chipsWon < THRESHHOLD_LEVEL_3) {
        userLevel = {
            level: 3,
            name: NAME_LEVEL_3,
            percent: Math.floor((chipsWon * 100) / THRESHHOLD_LEVEL_3),
            threshhold: THRESHHOLD_LEVEL_3,
        };
    } else if (chipsWon < THRESHHOLD_LEVEL_4) {
        userLevel = {
            level: 4,
            name: NAME_LEVEL_4,
            percent: Math.floor((chipsWon * 100) / THRESHHOLD_LEVEL_4),
            threshhold: THRESHHOLD_LEVEL_4,
        };
    } else if (chipsWon >= THRESHHOLD_LEVEL_4) {
        userLevel = {
            level: 5,
            name: NAME_LEVEL_5,
            percent: Math.floor((chipsWon * 100) / THRESHHOLD_LEVEL_5),
            threshhold: THRESHHOLD_LEVEL_5,
        };
    }
    return userLevel;
};

export const userAvatar = (id: number): string => {
    let image = "";
    switch (id % 4) {
        case 1:
            image = "avatar_1.png";
            break;
        case 2:
            image = "avatar_2.png";
            break;
        case 3:
            image = "avatar_3.png";
            break;
        case 0:
            image = "avatar_4.png";
            break;
    }

    return "/assets/i/avatars/" + image;
};
