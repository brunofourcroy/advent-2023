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

    const cur = {
        x: 0,
        y: 0
    };
    const { area, perimeter } = instructions.reduce((acc, instruction) => {
        const old = { ...cur };
        switch (instruction.direction) {
            case Direction.UP:
                cur.y -= instruction.length;
                break;
            case Direction.DOWN:
                cur.y += instruction.length;
                break;
            case Direction.LEFT:
                cur.x -= instruction.length;
                break;
            case Direction.RIGHT:
                cur.x += instruction.length;
                break;
        }
        const area = acc.area + (old.x * cur.y - old.y * cur.x);
        const perimeter = acc.perimeter + Math.abs(cur.x - old.x) + Math.abs(cur.y - old.y);
        return { area, perimeter };
    }, { area: 0, perimeter: 0 });


    return (Math.abs(area) + perimeter) / 2 + 1;
};