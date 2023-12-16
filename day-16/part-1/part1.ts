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

export const part1 = (input: string): number => {
    const board = parseInput(input);

    let energizedCount = 0;
    const beams: Beam[] = [{
        coords: [-1, 0], // Starting off the board
        direction: Direction.Right
    }];

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