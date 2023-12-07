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
                return 0;
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

        // First we detect 4 or 5 of a kind
        // Starting with cases where the first cards are jokers (by excluding them)
        const noJoker = cards.filter((card) => card !== 0);
        const sameAsFirstNoJoker = noJoker.filter((card) => card === noJoker[0]).length;
        if (sameAsFirstNoJoker === noJoker.length) {
            return {
                cards,
                bid,
                score: 7,
            };
        }
        if (noJoker.length === 2) {
            return {
                cards,
                bid,
                score: 6,
            };
        }
        const sameAsSecondNoJoker = noJoker.filter((card) => card === noJoker[1]).length;
        if (sameAsSecondNoJoker === noJoker.length - 1) {
            return {
                cards,
                bid,
                score: 6,
            };
        }


        // Then we check for all (pick up 4 and 5 of a kind where first two cards are not jokers)
        const sameAsFirst = cards.filter((card) => card === cards[0] || card === 0).length;
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
        const sameAsSecond = cards.filter((card) => card === cards[1] || card === 0).length;
        if (sameAsSecond === 4) {
            return {
                cards,
                bid,
                score: 6,
            };
        }
        const sameAsThird = cards.filter((card) => card === cards[2] || card === 0).length;
        const sameAsFourth = cards.filter((card) => card === cards[3] || card === 0).length;
        const sameAsFifth = cards.filter((card) => card === cards[4] || card === 0).length;

        const numberInTrios = [sameAsFirst, sameAsSecond, sameAsThird, sameAsFourth, sameAsFifth].filter((same) => same === 3).length;
        const numberInPairs = [sameAsFirst, sameAsSecond, sameAsThird, sameAsFourth, sameAsFifth].filter((same) => same === 2).length;
        const numberOfJokers = cards.filter((card) => card === 0).length;
        if (numberOfJokers === 0) {
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
        }
        if (numberOfJokers === 1) {
            // 11J22 scenario
            if (numberInTrios === 4) {
                return {
                    cards,
                    bid,
                    score: 5,
                };
            }
            // 11J23 scenario
            if (numberInTrios === 2) {
                return {
                    cards,
                    bid,
                    score: 4,
                };
            }
            // Can't have two pairs with a joker
            // The joker will always be used with one of the pair for a 3-of-a-kind

            // 1J234 scenario
            if (numberInPairs === 4) {
                return {
                    cards,
                    bid,
                    score: 2,
                };
            }
        }
        if (numberOfJokers === 2) {
            // Cannot have a full house with two jokers
            // The jokers would either make a 5 or 4 of a kind.
            // eg. 111JJ (5), 1JJ22 (4), 11J2J (4)
            
            // 1JJ23 scenario
            if (numberInTrios === 3) {
                return {
                    cards,
                    bid,
                    score: 4,
                };
            }
            // Cannot have two pairs with two jokers
            // JJ223 -> 4 of a kind 
            // 1J2J3 -> 3 of a kind 
            // 1J22J -> 4 of a kind 

            // Cannot have one pair with two jokers, as the jokers would be used to make a 3 of a kind at the minimum
        }
        // If there are 3 jokers or more, the 4 or 5 of a kind cases conditions at the top would have selected the score already
        return {
            cards,
            bid,
            score: 1,
        };
    });
};

export const part2 = (input: string): number => {
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

