type Direction = 'L' | 'R'

type Map = Record<string, { left: string; right: string }>

const parseFile = (input: string): { directions: Direction[], nodes: Map, startingNodes: string[] } => {
    const lines = input.split('\n');
    let startingNodes: string[] = [];
    const directions = lines[0].split('') as Direction[];
    const nodes = lines.slice(2).reduce((acc: Map, line) => {
        const [rawPos, dirs] = line.split('=');
        const pos = rawPos.trim();
        if (pos.endsWith('A')) {
            startingNodes.push(pos);
        }
        return {
            ...acc,
            [pos]: {
                left: dirs.trim().slice(1, -1).split(',')[0].trim(),
                right: dirs.trim().slice(1, -1).split(',')[1].trim()
            }
        }
    }, {})
    
    
    return { directions, nodes, startingNodes }
};

const getGreatestCommonDivisor = (a: number, b: number): number => !b ? a : getGreatestCommonDivisor(b, a % b);
const getLeastCommonMultiple = (a: number, b: number): number => (a * b) / getGreatestCommonDivisor(a, b);

export const part2 = (input: string): number => {
    const { directions, nodes, startingNodes } = parseFile(input);
    const stepsRequired: number[] = [];
    for (let i = 0; i < startingNodes.length; i++) {
        // For each starting positions, we need to find how often it ends on a node ending with Z
        let nextMoveCur = 0;
        let nextMove = directions[nextMoveCur];
        let counter = 0;
        let cur = startingNodes[i]
        while (!cur.endsWith('Z')) {
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
        stepsRequired.push(counter);
    }
    // Find LCM of all stepsRequired
    return stepsRequired.reduce((acc: number, s) => getLeastCommonMultiple(acc, s));
}

