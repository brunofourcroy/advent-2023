import { getCards } from "./getCards";


export const getNumOfCards = (input: string): number => {
    const cards = getCards(input);

    let cursor = 0;
    while ( cursor < cards.length) {
        const cardScore = cards[cursor].actual.filter(num => cards[cursor].winning.includes(num)).length;
        cards[cursor].score = cardScore;
        cursor += 1;
    }

    const cardCounter: Record<number, number> = {};

    // Initialising simplifies the checks in the next loop
    for (let i = 0; i < cards.length; i++) {
        cardCounter[i] = 1;
    }

    cursor = 0;
    while ( cursor < cards.length) {
        const card = cards[cursor];
        const score = card.score ?? 0;
        const cardCount = cardCounter[cursor];
        for (let j = 0; j < cardCount; j++) {
            for (let i = 0; i < score; i++) {
                const cardToAdd = cursor + i + 1;
                
                // We cannot gain cards above the last one we have
                if (cardToAdd < cards.length) {
                    cardCounter[cardToAdd] += 1;
                }
            }
        }
        cursor += 1;
    }

    // We count all the cards
    return Object.values(cardCounter).reduce((acc, num) => acc + num, 0);
};
