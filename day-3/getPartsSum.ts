import { getMatrix, isPart } from "./utils";

export const getPartsSum = (input: string): number => {
    const matrix = getMatrix(input);

    const cursor: [number, number] = [0, 0]; // [row, column]

    const partNumbers: number[] = [];
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
                if (isPart(numBuffer, matrix, cursor)) {
                    partNumbers.push(parseInt(numBuffer, 10));
                }
                // And we reset the number buffer
                numBuffer = '';
                moveCursor();
                continue;
            }
        } else {
            // If it's not a number, we can move on (it's either null or 'x')
            moveCursor();
            continue;
        }
    }

    return partNumbers.reduce((acc, num) => acc + num, 0);
}