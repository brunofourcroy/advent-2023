import { getCards } from "./getCards";

type Card = {
    winning: number[];
    actual: number[];
}

export const getSumOfPoints = (input: string): number => {
    const cards = getCards(input);

    return  cards.reduce((acc: number, card, index) => {
        const cardScore = card.actual.reduce((acc: number, number) => {
            if (card.winning.includes(number)) {
                if (acc === 0) {
                    return 1;
                }
                return acc * 2;
            }
            
            return acc;
        }, 0);
        console.log(card);
        console.log(`Card score for card ${index + 1}: ${cardScore}`);
        return cardScore + acc;
    }, 0)
};