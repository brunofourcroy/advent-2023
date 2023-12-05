type Mappings = {
    destStart: number;
    sourceStart: number;
    range: number;
}[][];

type Seed = {
    start: number;
    range: number;
}

const mapInput = (input: string): { map: Mappings, startingSeeds: Seed[] } => {
    const blocks = input.split('\n\n');
    const firsline = blocks[0].split(':')[1].trim().split(' ').map((s) => parseInt(s, 10));

    const startingSeeds: Seed[] = [];
    for (let j = 0; j < firsline.length; j += 2) {
        startingSeeds.push({ start: firsline[j], range: firsline[j + 1] });
    }
    const map = [];

    for (let i = 1; i < blocks.length; i++) {
        const blockMapping = [];
        const rawMappings = blocks[i].split('\n');
        rawMappings.shift();
        const mappings = rawMappings.map((m) => m.split(' ').map((s) => parseInt(s, 10)));
        for (let j = 0; j < mappings.length; j++) {
            const [destStart, sourceStart, range] = mappings[j];
            blockMapping.push({ destStart, sourceStart, range });
        }
        map.push(blockMapping);
    }

    return {
        startingSeeds,
        map
    }
}

export const getStartingPoint = (endingPoint: number, map: Mappings, depth = 0): number => {
    const step = map[map.length -1 - depth];

    let matchingRange = null;

    for (let i = 0; i < step.length; i++) {
        const range = step[i];
        if (endingPoint >= range.destStart && endingPoint < range.destStart + range.range) {
            matchingRange = range;
            break;
        }
    }
    // If no range was found, then the value is the same
    const matchingOrigin = matchingRange ? 
        matchingRange.sourceStart + (endingPoint - matchingRange.destStart) :
        endingPoint;

    // We reached the top
    if (depth === map.length - 1) {
        return matchingOrigin;
    }
    return getStartingPoint(matchingOrigin, map, depth + 1);
};

export const matchesOneSeed = (startingPoint: number, seeds: Seed[]): boolean => {
    for (let i = 0; i < seeds.length; i++) {
        const seed = seeds[i];
        if (startingPoint >= seed.start && startingPoint < seed.start + seed.range) {
            return true;
        }
    }
    return false;
}

export const getLowestLocationWithRanges = (input: string): number => {
    const {map, startingSeeds } = mapInput(input);
    let lowestLocation: number = 0;

    let cursor = -1;
    while (lowestLocation === 0) {
        cursor +=1
        const startingPoint = getStartingPoint(cursor, map);
        if (matchesOneSeed(startingPoint, startingSeeds)) {
            lowestLocation = cursor;
        }
    }

    return lowestLocation;
}