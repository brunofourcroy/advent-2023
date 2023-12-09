const parseFile = (input: string): number[][] => 
    input.split('\n').map(line => line.split(' ').map(Number));

const findLastDigits = (sequence: number[], prevLastDigits: number[] = []): number[] => {
    const diffs: number[] = [];
    for (let i = 0; i < sequence.length - 1; i++) {
        diffs.push(sequence[i + 1] - sequence[i]);
    } 
    if (diffs.every(d => d === 0)) {
        return [...prevLastDigits, diffs[diffs.length - 1]];
    }
    return findLastDigits(diffs, [...prevLastDigits, diffs[diffs.length - 1]]);
}

export const part1 = (input: string): number => {
    const sequences = parseFile(input);
    const nexts: number[] = [];
    for (let i = 0; i < sequences.length; i++) {
        const lastDigits = findLastDigits(sequences[i], [sequences[i][sequences[i].length -1]]);
        nexts.push(lastDigits.reduce((acc, next) => acc + next, 0));
    }
    return nexts.reduce((acc, next) => acc + next, 0);
}