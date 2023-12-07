type Hand = {
    cards: number[];
    bid: number;
    score: number;
}

const parseFile = (input: string): Hand[] => {
    const lines = input.split('\n');

    return lines.map((line) => {
        const [allCards, rawBid] = line.split(' ');
        const bid = parseInt(rawBid, 10);
        const cards = allCards.split('').map((card) => {
            const cardInt = parseInt(card, 10);
            if (cardInt >= 2 && cardInt <= 9) {
                return cardInt;
            }
            if (card === 'T') {
                return 10;
            }
            if (card === 'J') {
                return 11;
            }
            if (card === 'Q') {
                return 12;
            }
            if (card === 'K') {
                return 13;
            }
            if (card === 'A') {
                return 14;
            }
            throw new Error(`Unknown card ${card}`);
        });
        // All different - 1
        // One pair - 2
        // Two pairs - 3
        // Three of a kind - 4
        // Fullhouse - 5
        // Four of a kind - 6
        // Five of a kind - 7
        const sameAsFirst = cards.filter((card) => card === cards[0]).length;
        if (sameAsFirst === 5) {
            return {
                cards,
                bid,
                score: 7,
            };
        }
        if (sameAsFirst === 4) {
            return {
                cards,
                bid,
                score: 6,
            };
        }
        const sameAsSecond = cards.filter((card) => card === cards[1]).length;
        if (sameAsSecond === 4) {
            return {
                cards,
                bid,
                score: 6,
            };
        }
        const sameAsThird = cards.filter((card) => card === cards[2]).length;
        const sameAsFourth = cards.filter((card) => card === cards[3]).length;
        const sameAsFifth = cards.filter((card) => card === cards[4]).length;

        const numberInTrios = [sameAsFirst, sameAsSecond, sameAsThird, sameAsFourth, sameAsFifth].filter((same) => same === 3).length;
        const numberInPairs = [sameAsFirst, sameAsSecond, sameAsThird, sameAsFourth, sameAsFifth].filter((same) => same === 2).length;
        if (numberInTrios === 3 && numberInPairs === 2) {
            return {
                cards,
                bid,
                score: 5,
            };
        }
        if (numberInTrios === 3) {
            return {
                cards,
                bid,
                score: 4,
            };
        }
        if (numberInPairs === 4) {
            return {
                cards,
                bid,
                score: 3,
            };
        }
        if (numberInPairs === 2) {
            return {
                cards,
                bid,
                score: 2,
            };
        }
        return {
            cards,
            bid,
            score: 1,
        };
    });
};

export const part1 = (input: string): number => {
    const hands = parseFile(input);
    hands.sort((a, b) => {
        if (a.score === b.score) {
            if (a.cards[0] === b.cards[0]) {
                if (a.cards[1] === b.cards[1]) {
                    if (a.cards[2] === b.cards[2]) {
                        if (a.cards[3] === b.cards[3]) {
                            return b.cards[4] - a.cards[4];
                        }
                        return b.cards[3] - a.cards[3];
                    }
                    return b.cards[2] - a.cards[2];
                }
                return b.cards[1] - a.cards[1];
            }
            return b.cards[0] - a.cards[0];
        }
        return b.score - a.score;
    });

    return hands.reduce((acc, hand, index) => acc + hand.bid * (hands.length - index), 0);
}

