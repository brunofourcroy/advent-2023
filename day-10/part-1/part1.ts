enum Pos {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
}

const areConnected = (a: string, b: string, rel: Pos): boolean => {
    if (a === '.' || b === '.') {
        return false;
    }
    if (b === 'S') {
        switch (a) {
            case '-':
                return rel === Pos.LEFT || rel === Pos.RIGHT;
            case '7':
                return rel === Pos.LEFT || rel === Pos.BOTTOM;
            case '|':
                return rel === Pos.TOP || rel === Pos.BOTTOM;
            case 'J':
                return rel === Pos.TOP || rel == Pos.LEFT;
            case 'L':
                return rel === Pos.TOP || rel === Pos.RIGHT;
            case 'F':
                return rel === Pos.RIGHT || rel === Pos.BOTTOM;
        
        }
    }
    switch (a) {
        // S can go anywhere
        case 'S':
            switch (rel) {
                case Pos.TOP:
                    return b === 'F' || b === '|' || b === '7';
                case Pos.RIGHT:
                    return b === '-' || b === '7' || b === 'J';
                case Pos.BOTTOM:
                    return b === '|' || b === 'J' || b === 'L';
                case Pos.LEFT:
                    return b === '-' || b === 'F' || b === 'L';
            }
        case '-':
            switch (rel) {
                case Pos.TOP:
                    return false;
                case Pos.RIGHT:
                    return b === '-' || b === '7' || b === 'J';
                case Pos.BOTTOM:
                    return false;
                case Pos.LEFT:
                    return b === '-' || b === 'F' || b === 'L';
            }
        case '7':
            switch (rel) {
                case Pos.TOP:
                    return false;
                case Pos.RIGHT:
                    return false;
                case Pos.BOTTOM:
                    return b === '|' || b === 'J' || b === 'L';
                case Pos.LEFT:
                    return b === '-' || b === 'L' || b === 'F';
            }
        case '|':
            switch (rel) {
                case Pos.TOP:
                    return b === 'F' || b === '|' || b === '7';
                case Pos.RIGHT:
                    return false;
                case Pos.BOTTOM:
                    return b === '|' || b === 'J' || b === 'L';
                case Pos.LEFT:
                    return false;
            }
        case 'J':
            switch (rel) {
                case Pos.TOP:
                    return b === 'F' || b === '|' || b === '7';
                case Pos.RIGHT:
                    return false;
                case Pos.BOTTOM:
                    return false;
                case Pos.LEFT:
                    return b === '-' || b === 'L' || b === 'F';
            }
        case 'L':
            switch (rel) {
                case Pos.TOP:
                    return b === 'F' || b === '|' || b === '7';
                case Pos.RIGHT:
                    return b === '-' || b === '7' || b === 'J';
                case Pos.BOTTOM:
                    return false;
                case Pos.LEFT:
                    return false;
            }
        case 'F':
            switch (rel) {
                case Pos.TOP:
                    return false;
                case Pos.RIGHT:
                    return b === '-' || b === '7' || b === 'J';
                case Pos.BOTTOM:
                    return b === '|' || b === 'J' || b === 'L';
                case Pos.LEFT:
                    return false;
            }
    }
    throw new Error(`Unrecognized tiles ${a} and ${b}`);
}

const findNeighbour = (map: string[][], x: number, y: number, lastMove: Pos | null): { pos: [number, number], from: Pos } => {
    if (lastMove !== Pos.LEFT && x > 0 && areConnected(map[y][x], map[y][x - 1], Pos.LEFT)) {
        return { pos: [x - 1, y], from: Pos.RIGHT };
    }
    if (lastMove !== Pos.RIGHT && x < map[0].length - 1 && areConnected(map[y][x], map[y][x + 1], Pos.RIGHT)) {
        return { pos: [x + 1, y], from : Pos.LEFT };
    }
    if (lastMove !== Pos.TOP && y > 0 && areConnected(map[y][x], map[y - 1][x], Pos.TOP)) {
        return { pos: [x, y - 1], from: Pos.BOTTOM };
    }
    if (lastMove !== Pos.BOTTOM && y < map.length - 1 && areConnected(map[y][x], map[y + 1][x], Pos.BOTTOM)) {
        return { pos: [x, y + 1], from: Pos.TOP };
    }
    throw new Error(`No neighbour found for ${x}, ${y}`);
}

const parseFile = (input: string): string[] => {
    const path: string[] = []
    const map = input.split('\n').map(line => line.split(''));
    const startPos = input.indexOf('S');
    path.push('S');
    const [xS, yS] = [startPos % map[0].length -1, Math.floor(startPos / map[0].length)];
    
    let nextPos: number[] = [xS, yS];
    let lastMove: Pos | null = null;
    while (path.length === 1 || nextPos[0] !== xS || nextPos[1] !== yS) {
        const { pos, from } = findNeighbour(map, nextPos[0], nextPos[1], lastMove);
        lastMove = from;
        nextPos = pos;
        path.push(map[nextPos[1]][nextPos[0]]);
    }

    return path;
};
   
export const part1 = (input: string): number => {
    const path = parseFile(input);
    return (path.length - 1) / 2;
}