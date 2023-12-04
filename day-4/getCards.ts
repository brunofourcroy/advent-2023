type Card = {
    winning: number[];
    actual: number[];
    score?: number;
}

export const getCards = (input: string): Card[] => {
    const lines = input.split('\n');
    const cards: Card[] = lines.map((line) => {
        const [header, numbers] = line.split(':');
        const [winning, actual] = numbers.split('|').map(s => s.trim());

        return {
            winning: winning.split(' ').map(s => s.trim()).filter(Boolean).map(s => parseInt(s, 10)),
            actual: actual.split(' ').map(s => s.trim()).filter(Boolean).map(s => parseInt(s, 10)),
        }
    });

    return cards;
}