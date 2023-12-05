type Mappings = {
    destStart: number;
    sourceStart: number;
    range: number;
}[][]

const mapInput = (input: string, useRanges: boolean): { map: Mappings, startingSeeds: number[] } => {
    const blocks = input.split('\n\n');
    const firstLine = blocks[0].split(':')[1].trim().split(' ').map((s) => parseInt(s, 10));

    let startingSeeds: number[] = [];
    if (useRanges) {
        for (let i = 0; i < firstLine.length; i += 2) {
            for (let j = 0; j < firstLine[i + 1]; j++) {
                startingSeeds.push(firstLine[i] + j);
            }
        }
    } else {
        startingSeeds = firstLine;
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

export const getLowestLocation = (input: string, useRanges = false): number => {
    const {map, startingSeeds } = mapInput(input, useRanges);
    console.log(`Number of starting seeds: ${startingSeeds.length}`);
    const locations = [];
    for (let i = 0; i < startingSeeds.length; i++) {
        let cur = startingSeeds[i];

        for (let j = 0; j < map.length; j++) {
            const block = map[j];
            for (let k = 0; k < block.length; k++) {
                const { destStart, sourceStart, range } = block[k];
                if (cur >= sourceStart && cur < sourceStart + range) {
                    cur = destStart + (cur - sourceStart);
                    break;
                }
            }
        }
        locations.push(cur);
    }

    // Return smallest location
    return Math.min(...locations);
}