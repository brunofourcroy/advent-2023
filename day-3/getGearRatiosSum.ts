import { getMatrix, isPart, Part, Matrix } from "./utils";

const getAdjacentParts = (cursor: [number, number], matrix: Matrix): Part[] => {
    const adjacentParts: Part[] = [];
    const addPartIfMissing = (part: Part) => {
        if (!adjacentParts.some((adjacentPart) => adjacentPart.id === part.id)) {
            adjacentParts.push(part);
        }
    };
    // Top
    if (cursor[0] > 0 && matrix[cursor[0] - 1][cursor[1]] instanceof Part) {
        addPartIfMissing(matrix[cursor[0] - 1][cursor[1]] as Part);
    }
    // Top right
    if (cursor[0] > 0 && cursor[1] < matrix[0].length - 1 && matrix[cursor[0] - 1][cursor[1] + 1] instanceof Part) {
        addPartIfMissing(matrix[cursor[0] - 1][cursor[1] + 1] as Part);
    }
    // Top left
    if (cursor[0] > 0 && cursor[1] > 0 && matrix[cursor[0] - 1][cursor[1] - 1] instanceof Part) {
        addPartIfMissing(matrix[cursor[0] - 1][cursor[1] - 1] as Part);
    }
    // Left
    if (cursor[1] > 0 && matrix[cursor[0]][cursor[1] - 1] instanceof Part) {
        addPartIfMissing(matrix[cursor[0]][cursor[1] - 1] as Part);
    }
    // Bottom left
    if (cursor[0] < matrix.length - 1 && cursor[1] > 0 && matrix[cursor[0] + 1][cursor[1] - 1] instanceof Part) {
        addPartIfMissing(matrix[cursor[0] + 1][cursor[1] - 1] as Part);
    }
    // Bottom
    if (cursor[0] < matrix.length - 1 && matrix[cursor[0] + 1][cursor[1]] instanceof Part) {
        addPartIfMissing(matrix[cursor[0] + 1][cursor[1]] as Part);
    }
    // Bottom right
    if (cursor[0] < matrix.length - 1 && cursor[1] < matrix[0].length - 1 && matrix[cursor[0] + 1][cursor[1] + 1]) {
        addPartIfMissing(matrix[cursor[0] + 1][cursor[1] + 1] as Part);
    }
    // Right
    if (cursor[1] < matrix[0].length - 1 && matrix[cursor[0]][cursor[1] + 1] instanceof Part) {
        addPartIfMissing(matrix[cursor[0]][cursor[1] + 1] as Part);
    }
    return adjacentParts;
};

export const getGearRatiosSum = (input: string): number => {
    const matrix = getMatrix(input);

    const cursor: [number, number] = [0, 0]; // [row, column]

    let numBuffer: string = '';

    const moveCursor = () => {
        if (cursor[1] === matrix[0].length - 1) {
            cursor[0] += 1;
            cursor[1] = 0;
        } else {
            cursor[1] += 1;
        }
    }

    while (cursor[0] <= matrix.length - 1 && cursor[1] <= matrix[0].length - 1) {
        const cell = matrix[cursor[0]][cursor[1]];
        if (typeof cell === 'number') {
            numBuffer += cell.toString();
            // If it's not the last digit in a chain, we buffered it, we can move on
            if (cursor[1] < matrix[0].length - 1 && typeof matrix[cursor[0]][cursor[1] + 1] === 'number') {
                moveCursor();
                continue;
            // Otherwise, we have a full number, we need to check whether it should be considered a part
            } else {
                // If it is a part, replace its cells with a new Part
                if (isPart(numBuffer, matrix, cursor)) {
                    const part = new Part(Math.random(), parseInt(numBuffer, 10));
                    for (let i = 0; i < numBuffer.length; i++) {
                        matrix[cursor[0]][cursor[1] - i] = part;
                    }
                }
                // And we reset the number buffer
                numBuffer = '';
                moveCursor();
                continue;
            }
        } else {
            // If it's not a number, we can move on (it's either null, 'x' or a gear)
            moveCursor();
            continue;
        }
    }

    // Now that we have all the parts, we can go through the matrix again and find gears adjacent to at least two parts
    const gearRatios: number[] = [];
    
    // Reset cursor
    cursor[0] = 0;
    cursor[1] = 0;

    while (cursor[0] <= matrix.length - 1 && cursor[1] <= matrix[0].length - 1) {
        const cell = matrix[cursor[0]][cursor[1]];
        if (cell === '*') {
            // Check if the gear is adjacent to at least two parts
            const adjacentParts = getAdjacentParts(cursor, matrix);
            if (adjacentParts.length >= 2) {
                const gearRatio = adjacentParts.reduce((acc, part, index) => {
                    if (index === 0) {
                        return acc;
                    }
                    return acc * part.value;
                }, adjacentParts[0].value);
                gearRatios.push(gearRatio);
            }
            moveCursor();
        } else {
            // If it's not a number, we can move on (it's either null, 'x' or a gear)
            moveCursor();
        }
    }
    return gearRatios.reduce((acc, gearRatio) => acc + gearRatio, 0);
}