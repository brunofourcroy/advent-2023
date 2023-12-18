enum Direction {
    UP = 'U',
    DOWN = 'D',
    LEFT = 'L',
    RIGHT = 'R'
}

type Instruction = {
    direction: Direction;
    length: number
}

export const part2 = (input: string): number => {
    const instructions: Instruction[] = input.split('\n').map((line: string): Instruction => {
        const [useless, uselessAgain, instruction] = line.split(' ');
        const length = parseInt(`${instruction.substring(2, instruction.length - 2)}`, 16);
        const directionDigit = instruction[instruction.length - 2];
        switch (directionDigit) {
            case '0':
                return {
                    direction: Direction.RIGHT,
                    length
                }
            case '1':
                return {
                    direction: Direction.DOWN,
                    length
                }
            case '2':
                return {
                    direction: Direction.LEFT,
                    length
                }
            case '3':
                return {
                    direction: Direction.UP,
                    length
                }
            default:
                throw new Error(`Unknown direction digit: ${directionDigit}`);
        }
    });

    const map: string[][] = [[]];
    const cur = {
        x: 0,
        y: 0
    };
    console.log(instructions);
    for (const instruction of instructions) {
        switch (instruction.direction) {
            case Direction.UP:
                for (let i = 0; i < instruction.length; i++) {
                    if (cur.y === 0) {
                        const lengthToFill = map[0].length;
                        map.unshift([]);
                        for (let j = 0; j < lengthToFill; j++) {
                            map[0].push('.');
                        }
                        cur.y++;
                    }
                    cur.y--;
                    map[cur.y][cur.x] = '#';
                }
                break;
            case Direction.DOWN:
                for (let i = 0; i < instruction.length; i++) {
                    if (cur.y === map.length - 1) {
                        const lengthToFill = map[0].length;
                        map.push([]);
                        for (let j = 0; j < lengthToFill; j++) {
                            map[map.length - 1].push('.');
                        }
                    }
                    cur.y++;
                    map[cur.y][cur.x] = '#';
                }
                break;
            case Direction.LEFT:
                for (let i = 0; i < instruction.length; i++) {
                    if (cur.x === 0) {
                        for (let j = 0; j < map.length; j++) {
                            map[j].unshift('.');
                        }
                        cur.x++;
                    }
                    cur.x--;
                    map[cur.y][cur.x] = '#';
                }
                break;
            case Direction.RIGHT:
                for (let i = 0; i < instruction.length; i++) {
                    if (cur.x === map[0].length - 1) {
                        for (let j = 0; j < map.length; j++) {
                            map[j].push('.');
                        }
                    }
                    cur.x++;
                    map[cur.y][cur.x] = '#';
                }
                break;
        }
        console.log(`Map is now ${map.length}x${map[0].length}`);
    }
    let cubicMeters = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === '#') {
                cubicMeters += 1;
            } else {
                // Counting edges to know if cell is enclosed
                // Pretending we are passing 'above' the cells.
                if (j === 0) {
                    continue;
                }
                let edges = 0;
                for (let k = j - 1; k >= 0; k--) {
                    if (map[i][k] === '#') {
                        // Check if the one above is an edge also
                        if (i !== 0 && map[i - 1][k] === '#') {
                            edges++;
                        }
                    }
                }
                if (edges % 2 !== 0) {
                    cubicMeters += 1;
                }
            }
        }
    }

    return cubicMeters;
};