enum Direction {
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R'
}

type Cell = {
    type: string;
    energized: boolean;
    beamDirections: Direction[];
}

type Beam = {
    coords: [number, number];
    direction: Direction;
}

const parseInput = (input: string): Cell[][] => {
    return input.split('\n').map((line) => {
        return line.split('').map((char) => {
            return {
                type: char,
                energized: false,
                beamDirections: []
            };
        });
    });
}

const getEnergizedCount = (input: string, startingBeam: Beam): number => {
    // Re-parsing the input every time is inefficient, but it's fast enough
    // It's being mutated below and I am too lazy to make a copy
    const board = parseInput(input);
    let energizedCount = 0;
    const beams: Beam[] = [startingBeam];

    while (beams.length > 0) {
        for (let i = 0; i < beams.length; i++) {
            const beam = beams[i];
            switch (beam.direction) {
                case Direction.Up:
                    if (beam.coords[1] === 0) {
                        beams.splice(i, 1);
                        i--;
                        continue;
                    }
                    beam.coords[1] -= 1;
                    break;
                case Direction.Down:
                    if (beam.coords[1] === board.length - 1) {
                        beams.splice(i, 1);
                        i--;
                        continue;
                    }
                    beam.coords[1] += 1;
                    break;
                case Direction.Left:
                    if (beam.coords[0] === 0) {
                        beams.splice(i, 1);
                        i--;
                        continue;
                    }
                    beam.coords[0] -= 1;
                    break;
                case Direction.Right:
                    if (beam.coords[0] === board[0].length - 1) {
                        beams.splice(i, 1);
                        i--;
                        continue;
                    }
                    beam.coords[0] += 1;
                    break;
            }
            const newCell = board[beam.coords[1]][beam.coords[0]];
            if (!newCell.energized) {
                newCell.energized = true;
                energizedCount += 1;
            }
            if (newCell.beamDirections.indexOf(beam.direction) === -1) {
                newCell.beamDirections.push(beam.direction);
            } else {
                // We already had a beam come from this direction, this is a loop
                beams.splice(i, 1);
                i--;
                continue;
            }
            switch (newCell.type) {
                case '.':
                    continue;
                case '-':
                    if (beam.direction === Direction.Right || beam.direction === Direction.Left) {
                        continue;
                    }
                    beam.direction = Direction.Left;
                    beams.push({
                        coords: [...beam.coords],
                        direction: Direction.Right
                    });
                    continue;
                case '|':
                    if (beam.direction === Direction.Up || beam.direction === Direction.Down) {
                        continue;
                    }
                    beam.direction = Direction.Up;
                    beams.push({
                        coords: [...beam.coords],
                        direction: Direction.Down
                    });
                    continue;
                case '/':
                    switch (beam.direction) {
                        case Direction.Up:
                            beam.direction = Direction.Right;
                            continue;
                        case Direction.Down:
                            beam.direction = Direction.Left;
                            continue;
                        case Direction.Left:
                            beam.direction = Direction.Down;
                            continue;
                        case Direction.Right:
                            beam.direction = Direction.Up;
                            continue;
                    }
                case '\\':
                    switch (beam.direction) {
                        case Direction.Up:
                            beam.direction = Direction.Left;
                            continue;
                        case Direction.Down:
                            beam.direction = Direction.Right;
                            continue;
                        case Direction.Left:
                            beam.direction = Direction.Up;
                            continue;
                        case Direction.Right:
                            beam.direction = Direction.Down;
                            continue;
                    }
            }
        }
    }

    return energizedCount;
}

export const part2 = (input: string): number => {
    const board = parseInput(input);
    let maxEnergy = 0;
    
    // Top row
    for (let i = 0; i < board[0].length; i++) {
        const startingBeam: Beam = {
            coords: [i, -1],
            direction: Direction.Down
        };
        const energizedCount = getEnergizedCount(input, startingBeam);
        if (energizedCount > maxEnergy) {
            maxEnergy = energizedCount;
        }
    }
    // Bottom row
    for (let i = 0; i < board[board.length - 1].length; i++) {
        const startingBeam: Beam = {
            coords: [i, board.length],
            direction: Direction.Up
        };
        const energizedCount = getEnergizedCount(input, startingBeam);
        if (energizedCount > maxEnergy) {
            maxEnergy = energizedCount;
        }
    }
    // Left column
    for (let i = 0; i < board.length; i++) {
        const startingBeam: Beam = {
            coords: [-1, i],
            direction: Direction.Right
        };
        const energizedCount = getEnergizedCount(input, startingBeam);
        if (energizedCount > maxEnergy) {
            maxEnergy = energizedCount;
        }
    }
    // Right column
    for (let i = 0; i < board.length; i++) {
        const startingBeam: Beam = {
            coords: [board[0].length, i],
            direction: Direction.Left
        };
        const energizedCount = getEnergizedCount(input, startingBeam);
        if (energizedCount > maxEnergy) {
            maxEnergy = energizedCount;
        }
    }


    return maxEnergy
}