type Race = {
    time: number;
    distance: number;
}

const parseFile = (input: string, combineRaces: boolean): Race[] => {
    const lines = input.split('\n');
    let times: number[] = [];
    let distance: number[] = [];
    if (!combineRaces) {
        times = lines[0].split(':')[1].trim().split(' ').filter(Boolean).map((s) => parseInt(s, 10));
        distance = lines[1].split(':')[1].trim().split(' ').filter(Boolean).map((s) => parseInt(s, 10));
    } else {
        times = [parseInt(lines[0].split(':')[1].replace(/\s/g, ''), 10)];
        distance = [parseInt(lines[1].split(':')[1].replace(/\s/g, ''), 10)];
    }
    return times.map((time, i) => ({ time, distance: distance[i] }));
};

export const part1 = (input: string, combineRaces = false): number => {
    const races = parseFile(input, combineRaces);
    const ranges: number[] = [];
    for (let i = 0; i < races.length ; i++) {
        const { time, distance } = races[i];
        let min = Math.ceil((time - Math.sqrt(time * time - 4 * distance)) / 2);
        if (min * (time - min ) === distance) {
            min += 1;
        }
        let max = Math.trunc((time + Math.sqrt(time * time - 4 * distance)) / 2);
        if (max * (time - max ) === distance) {
            max -= 1;
        }
        const range = max - min + 1;
        ranges.push(range);
    }

    return ranges.reduce((acc: number, r) => r * acc, 1);
}

