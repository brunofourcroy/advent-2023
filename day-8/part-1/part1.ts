type Direction = 'L' | 'R'

type Map = Record<string, { left: string; right: string }>

const parseFile = (input: string): { directions: Direction[], nodes: Map } => {
    const lines = input.split('\n');
    const directions = lines[0].split('') as Direction[];
    const nodes = lines.slice(2).reduce((acc: Map, line) => {
        const [pos, dirs] = line.split('=');


        return {
            ...acc,
            [pos.trim()]: {
                left: dirs.trim().slice(1, -1).split(',')[0].trim(),
                right: dirs.trim().slice(1, -1).split(',')[1].trim()
            }
        }
    }, {})
    
    
    return { directions, nodes }
};

export const part1 = (input: string): number => {
    const { directions, nodes } = parseFile(input);
    let counter = 0;
    let cur = 'AAA';
    let nextMoveCur = 0;
    let nextMove: string;
    while (cur !== 'ZZZ') {
        nextMove = directions[nextMoveCur];
        counter += 1;
        if (nextMove === 'R') {
            cur = nodes[cur].right;
        } else {
            cur = nodes[cur].left;
        }
        nextMoveCur += 1;
        if (nextMoveCur >= directions.length) {
            nextMoveCur = 0;
        }
    }

    return counter;
}

