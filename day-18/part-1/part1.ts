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

const replaceAt = (string: string, index: number, replacement: string) => {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
}

export const part1 = (input: string): number => {
    const instructions: Instruction[] = input.split('\n').map((instruction: string): Instruction => {
        const [direction, lengthString] = instruction.split(' ');
        const length = parseInt(lengthString, 10);

        return {
            direction: direction as Direction,
            length
        }
    });

    const map: string[] = ['.'];
    const cur = {
        x: 0,
        y: 0
    };

    for (const instruction of instructions) {
        switch (instruction.direction) {
            case Direction.UP:
                for (let i = 0; i < instruction.length; i++) {
                    if (cur.y === 0) {
                        const lengthToFill = map[0].length;
                        map.unshift('');
                        for (let j = 0; j < lengthToFill; j++) {
                            map[0] += '.';
                        }
                        cur.y++;
                    }
                    cur.y--;
                    map[cur.y] = replaceAt(map[cur.y], cur.x, '#');
                }
                break;
            case Direction.DOWN:
                for (let i = 0; i < instruction.length; i++) {
                    if (cur.y === map.length - 1) {
                        const lengthToFill = map[0].length;
                        map.push('');
                        for (let j = 0; j < lengthToFill; j++) {
                            map[map.length - 1] += '.';
                        }
                    }
                    cur.y++;
                    map[cur.y] = replaceAt(map[cur.y], cur.x, '#');
                }
                break;
            case Direction.LEFT:
                for (let i = 0; i < instruction.length; i++) {
                    if (cur.x === 0) {
                        for (let j = 0; j < map.length; j++) {
                            map[j] = '.' + map[j];
                        }
                        cur.x++;
                    }
                    cur.x--;
                    map[cur.y] = replaceAt(map[cur.y], cur.x, '#');
                }
                break;
            case Direction.RIGHT:
                for (let i = 0; i < instruction.length; i++) {
                    if (cur.x === map[0].length - 1) {
                        for (let j = 0; j < map.length; j++) {
                            map[j] += '.';
                        }
                    }
                    cur.x++;
                    map[cur.y] = replaceAt(map[cur.y], cur.x, '#');
                }
                break;
        }
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