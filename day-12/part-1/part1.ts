const isValidSequence = (sequence: string[], damagedCounts: number[]): boolean => {
    const damagedSequence = sequence.join('').split('.').filter(v => v !== '').map(v => v.length);

    return damagedSequence.length === damagedCounts.length && damagedSequence.every((v, i) => damagedCounts[i] === v);
}

const fillSequence = (sequence: string[], damagedCounts: number[], cursor: number): string[][] => {
    if (cursor === sequence.length) {
        if (!isValidSequence(sequence, damagedCounts)) {
            return [];
        }
        return [sequence];
    }
    const charAtCursor = sequence[cursor];
    if (charAtCursor === '?') {
        const newSequenceDamaged = [...sequence];
        newSequenceDamaged[cursor] = '#';

        const sequencesDamaged = fillSequence(newSequenceDamaged, damagedCounts, cursor + 1);

        const newSequenceFine = [...sequence];
        newSequenceFine[cursor] = '.';

        const sequencesFine = fillSequence(newSequenceFine, damagedCounts, cursor + 1);

        return [...sequencesDamaged, ...sequencesFine];
    } else {
        return fillSequence(sequence, damagedCounts, cursor + 1);
    }
}

export const getCountOfPossibleArrangements = (input: string): number => {
    const { sequence, damagedCounts } = input.split(' ').reduce((acc: { sequence: string[], damagedCounts: number[] }, value, index) => {
        if (index === 0) {
            return {
                ...acc,
                sequence: value.split('')
            }
        }
        return {
            ...acc, 
            damagedCounts: value.split(',').map(v => parseInt(v, 10))
        };
    }, { sequence: [], damagedCounts: [] });

    const scenarios = fillSequence(sequence, damagedCounts, 0);

    return scenarios.length;
};

export const part1 = (input: string): number => {
    const lines = input.split('\n');

    return lines.reduce((acc, line) => {
        return acc + getCountOfPossibleArrangements(line)
    }, 0)
}