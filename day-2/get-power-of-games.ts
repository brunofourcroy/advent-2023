import { getMaxCounts } from "./get-max-counts";

export const getPowerOfGames = (input: string): number => {
    const games = getMaxCounts(input);

    return games.reduce((acc: number, game) => {
        return acc + (game.maxBlue * game.maxGreen * game.maxRed)
    }, 0);
};