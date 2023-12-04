export class Part {
    constructor(id: number, value: number) {
        this.id = id;
        this.value = value;
    }

    id: number;
    value: number;
}

export type Matrix = (string | number | null | Part)[][]

export const getMatrix = (input: string): Matrix => {
    const lines = input.split('\n');

    return lines.reduce((acc: Matrix, line) => {
        const row: (string | number | null)[] = [];
        const cells = line.split('');
        cells.forEach((cell) => {
            if (cell === '.') {
                row.push(null); 
            } else if (cell === '*') {
                // We leave gears as is
                row.push('*');
            } else if (!Number.isNaN(parseInt(cell, 10))) {
                row.push(parseInt(cell, 10));
            } else {
                // Replace all symbols with the same char
                row.push('x');
            }
        })
        acc.push(row);
        return acc;
    }, []);
};

const symbols: any[] = ['*', 'x'];

const isAdjacentToSymbol = (cursor: [number, number], matrix: Matrix): boolean => {
    // Above
    if (cursor[0] > 0 && symbols.includes(matrix[cursor[0] - 1][cursor[1]])) {
        return true;
    }
    // Top right
    if (cursor[0] > 0 && cursor[1] < matrix[0].length - 1 && symbols.includes(matrix[cursor[0] - 1][cursor[1] + 1])) {
        return true;
    }
    // Top left
    if (cursor[0] > 0 && cursor[1] > 0 && symbols.includes(matrix[cursor[0] - 1][cursor[1] - 1])) {
        return true;
    }
    // Left
    if (cursor[1] > 0 && symbols.includes(matrix[cursor[0]][cursor[1] - 1])) {
        return true;
    }
    // Bottom left
    if (cursor[0] < matrix.length - 1 && cursor[1] > 0 && symbols.includes(matrix[cursor[0] + 1][cursor[1] - 1])) {
        return true;
    }
    // Bottom
    if (cursor[0] < matrix.length - 1 && symbols.includes(matrix[cursor[0] + 1][cursor[1]])) {
        return true;
    }
    // Bottom right
    if (cursor[0] < matrix.length - 1 && cursor[1] < matrix[0].length - 1 && symbols.includes(matrix[cursor[0] + 1][cursor[1] + 1])) {
        return true;
    }
    // Right
    if (cursor[1] < matrix[0].length - 1 && symbols.includes(matrix[cursor[0]][cursor[1] + 1])) {
        return true;
    }
    return false;
};

// A number is a "part" if it is adjacent to an 'x' in the matrix, even diagonally
export const isPart = (num: string, matrix: Matrix, cursor: [number, number]): boolean => {
    const numLength = num.length;
    const cursorsToCheck: [number, number][] = [];
    for (let i = 0; i < numLength; i++) {
        cursorsToCheck.push([cursor[0], cursor[1] - i]);
    }
    return cursorsToCheck.some((cursorToCheck) => isAdjacentToSymbol(cursorToCheck, matrix));
}