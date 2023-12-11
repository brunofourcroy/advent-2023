const getGalaxyPositions = (input: string): { positions: [number, number][], emptyRows: number[], emptyColumns: number[]} => {
    const lines = input.split('\n');
    const initialMap = lines.map((line) => line.split(''));

    // Track empty rows
    const emptyRows = [];
    const positions: [number, number][] = [];
    for (let i = 0; i < initialMap.length; i++) {
        const line = initialMap[i];
        if (line.every((char) => char === '.')) {
            emptyRows.push(i);
        }
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '#') {
                positions.push([i, j]);
            }
        }
    }

    // Track empty columns
    const emptyColumns = [];
    for (let i = 0; i < initialMap[0].length; i++) {
        const column = initialMap.map((line) => line[i]);
        if (column.every((char) => char === '.')) {
            emptyColumns.push(i);
        }
    };

    return { positions, emptyRows, emptyColumns };
};

export const part2 = (input: string, expansionRate: number): number => {
    const { positions, emptyColumns, emptyRows } = getGalaxyPositions(input);

    return positions.reduce((acc: number, start, index) => {
        const distancesFromPos = [];
        for (let i = index; i < positions.length; i++) {
            const end = positions[i];
            const distance = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
            // Check if there were empty rows or colums between the two points
            const emptyRowsBetween = emptyRows.filter((row) => row > start[0] && row < end[0]); // Positions were gather top to bottom so no reason to check the other way
            const emptyColumnsBetween = emptyColumns.filter((column) => (column > start[1] && column < end[1]) || (column > end[1] && column < start[1]));
            // -1 because the one row/column was already counter, eg. expanding by 10 means adding 9.
            distancesFromPos.push(distance + emptyRowsBetween.length * (expansionRate - 1) + emptyColumnsBetween.length * (expansionRate - 1))
        }

        return acc + distancesFromPos.reduce((acc, distance) => acc + distance, 0);
    }, 0);
}