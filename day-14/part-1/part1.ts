const parseFile  = (input: string): string[][] => {
    return input.split('\n').map(line => line.split(''));
}

const tiltNorthAndGetScore = (column: string[]): number => {
    const groupsBetweenCubes = column.join('').split('#');
    const tiltedGroups = [];
    for (let i = 0; i < groupsBetweenCubes.length; i++) {
        const group = groupsBetweenCubes[i];
        if (group.length === 0) {
            tiltedGroups.push('');
            continue;
        }
        const numberOfBoulers = group.match(/O/g)?.length || 0;
        let tiltedGroup = '';
        for (let j = 0; j < numberOfBoulers; j++) {
            tiltedGroup += 'O';
        }
        for (let j = 0; j < group.length - numberOfBoulers; j++) {
            tiltedGroup += '.';
        }

        tiltedGroups.push(tiltedGroup);
    }
    const newColumn = tiltedGroups.join('#').split('');

    let load = 0;
    for (let i = 0; i < newColumn.length; i++) {
        if (newColumn[i] === 'O') {
            load += newColumn.length - i;
        }
    }
    return load;
}

export const part1 = (input: string): number => {
    const platform = parseFile(input);
    let totalLoad = 0;

    for (let j = 0; j < platform[0].length; j++) {
        const column = [];
        for (let i = 0; i < platform.length; i++) {
            column.push(platform[i][j]);
        }
        const load = tiltNorthAndGetScore(column);
        totalLoad += load;
    }

    return totalLoad;
}