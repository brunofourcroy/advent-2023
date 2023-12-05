import { getMaxCounts } from "./get-max-counts";

export const getPossibleGames = (input: string, inputRed: number, inputGreen: number, inputBlue: number): number => {
    const games = getMaxCounts(input);

    return games.reduce((acc: number, game, index) => {
        if (game.maxRed > inputRed || game.maxGreen > inputGreen || game.maxBlue > inputBlue) { 
            return acc;
        }
        return acc + index + 1;
    }, 0)
};