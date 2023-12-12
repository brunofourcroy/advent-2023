const cache = new Map<string, number>();

const getCountOfPossibleArrangements = (sequence: string[], damagedCounts: number[]): number => {
    const cacheKey = `${sequence.join('')}-${damagedCounts.join('')}`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey) as number;
    }
    
    // We ran out of chars
    if (!sequence.length) {
        // But we don't have any damage left, so we're good
        if (!damagedCounts.length) {
            cache.set(cacheKey, 1);
            return 1;
        }
        // Otherwise, we have damage left, so we're not good
        cache.set(cacheKey, 0);
        return 0;
    }

    // No more damage to account for!
    if (damagedCounts.length === 0) {
        // Unfortunately, there's some left in the sequence
        if (sequence.some(c => c === '#')) {
            cache.set(cacheKey, 0);
            return 0;
        }
        cache.set(cacheKey, 1);
        return 1;
    }
    const spaceRequiredForAllDamange = damagedCounts.reduce((acc, count) => acc + count, 0) + damagedCounts.length - 1;
    // We don't have any space left to account for all the damage.
    if (sequence.length < spaceRequiredForAllDamange) {
        cache.set(cacheKey, 0);
        return 0;
    }

    if (sequence[0] === '.') {
        // This one is safe, no damage, move on.
        const res = getCountOfPossibleArrangements(sequence.slice(1), damagedCounts);
        cache.set(cacheKey, res);
        return res;
    }

    if (sequence[0] === '#') {
        const [nextDamage, ...restOfDamage] = damagedCounts;
        for (let i = 1; i < nextDamage; i++) {
            if (sequence[i] === '.') {
                // Our next group of damaged sprints will not fit
                return 0;
            }
        }
        // If there is no empty space after this damage group, then it is too big 
        if (sequence[nextDamage] === '#') {
            return 0;
        }
        const res = getCountOfPossibleArrangements(sequence.slice(nextDamage + 1), restOfDamage);
        cache.set(cacheKey, res);
        return res;
    }

    // Otherwise, next char is a ?, so we try both ways
    const res = getCountOfPossibleArrangements(['#', ...sequence.slice(1)], damagedCounts) +
        getCountOfPossibleArrangements(['.', ...sequence.slice(1)], damagedCounts);
    cache.set(cacheKey, res);
    return res;
};

export const part2 = (input: string): number => {
    const lines = input.split('\n');

    return lines.reduce((acc, line) => {
        const { sequence, damagedCounts } = line.split(' ').reduce((acc: { sequence: string[], damagedCounts: number[] }, value, index) => {
            if (index === 0) {
                const initialSequence = value.split('');
                const sequence: string[] = [];
                for (let i = 0; i < 5; i++) {
                    sequence.push(...initialSequence, '?');
                }
                sequence.pop();
                return {
                    ...acc,
                    sequence
                }
            }
            const initialCounts = value.split(',').map(v => parseInt(v, 10));
            const damagedCounts = [];
            for (let i = 0; i < 5; i++) {
                damagedCounts.push(...initialCounts);
            }
            return {
                ...acc, 
                damagedCounts
            };
        }, { sequence: [], damagedCounts: [] });
        return acc + getCountOfPossibleArrangements(sequence, damagedCounts)
    }, 0)
}