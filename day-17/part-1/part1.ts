enum Direction {
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R'
}

type Node = {
    value: string;
    heatLoss: number;
    paths: Map<Node, { heatLoss: number, direction: Direction}>;
    visited: boolean;
    fromStart: number;
}

const parseInput = (input: string): Node[] => {
    const rawInput = input.split('\n').map(line => line.split(''));
    const map: Node[][] = [];
    for (let i = 0; i < rawInput.length; i++) {
        map.push([]);
        for (let j = 0; j < rawInput[i].length; j++) {
           const node: Node = {
                value: `${i}${j}`,
                heatLoss: parseInt(rawInput[i][j], 10),
                paths: new Map(),
                visited: false,
                fromStart: Infinity
           };
            map[i].push(node);
        }
    }
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (i > 0) {
                map[i][j].paths.set(map[i - 1][j], { heatLoss: map[i - 1][j].heatLoss, direction: Direction.Up });
            }
            if (i < map.length - 1) {
                map[i][j].paths.set(map[i + 1][j], { heatLoss: map[i + 1][j].heatLoss, direction: Direction.Down });
            }
            if (j > 0) {
                map[i][j].paths.set(map[i][j - 1], { heatLoss: map[i][j - 1].heatLoss, direction: Direction.Left });
            }
            if (j < map[i].length - 1) {
                map[i][j].paths.set(map[i][j + 1], { heatLoss: map[i][j + 1].heatLoss, direction: Direction.Right });
            }
        }
    }

    return map.flat();
}

const getShortestPath = (nodes: Node[], start: Node, end: Node): number => {
    const unvisited = new Set(nodes.map(node => node.value));
    start.fromStart = 0;

    let current: Node = start;
    const directions: Direction[] = []; 

    while (true) {
        for (const [neighbour, { heatLoss, direction }] of current.paths.entries()) {
            const distance = current.fromStart + heatLoss;
            if (distance < neighbour.fromStart) {
                neighbour.fromStart = distance;
            }
        }

        unvisited.delete(current.value);

        if (!unvisited.has(end.value)) {
            break;
        }
        let shortest = Infinity;
        for (const node of nodes) {
            if (unvisited.has(node.value) && node.fromStart < shortest) {
                shortest = node.fromStart;
                current = node;
            }
        }
    }

    return end.fromStart;
}

export const part1 = (input: string): number => {
    const nodes = parseInput(input);

    const minimumHeatloss = getShortestPath(nodes, nodes[0], nodes[nodes.length - 1]);

    return minimumHeatloss;
}