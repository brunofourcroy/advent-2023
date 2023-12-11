const getGalaxyPositions = (input: string): [number, number][] => {
    const lines = input.split('\n');
    const initialMap = lines.map((line) => line.split(''));

    // Double up empty rows 
    for (let i = 0; i < initialMap.length; i++) {
        const line = initialMap[i];
        if (line.every((char) => char === '.')) {
            initialMap.splice(i, 0, [...line]);
            i++;
        }
    }

    // Double empty columns
    for (let i = 0; i < initialMap[0].length; i++) {
        const column = initialMap.map((line) => line[i]);
        if (column.every((char) => char === '.')) {
            for (let j = 0; j < initialMap.length; j++) {
                initialMap[j].splice(i, 0, '.');
            }
            i++;
        }
    };
    const positions: [number, number][] = [];
    for (let i = 0; i < initialMap.length; i++) {
        const line = initialMap[i];
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '#') {
                positions.push([i, j]);
            }
        }
    }

    return positions;
};

export const part1 = (input: string): number => {
    const galaxyPositions = getGalaxyPositions(input);

    return galaxyPositions.reduce((acc: number, start, index) => {
        const distancesFromPos = [];
        for (let i = index; i < galaxyPositions.length; i++) {
            const end = galaxyPositions[i];
            const distance = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
            distancesFromPos.push(distance)
        }

        return acc + distancesFromPos.reduce((acc, distance) => acc + distance, 0);
    }, 0);
}