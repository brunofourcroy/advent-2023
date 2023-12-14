const parseFile  = (input: string): string[][] => {
    return input.split('\n').map(line => line.split(''));
}

const tiltCache = new Map<string, string[]>();

const tiltNorth = (column: string[]): string[] => {
    const key = column.join('');
    if (tiltCache.has(key)) {
        return tiltCache.get(key)!;
    }
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

    tiltCache.set(key, newColumn);
    return newColumn;
}

const rotateCache = new Map<string, string[][]>();

const rotateRight = (platform: string[][]): string[][] => {
    const key = platform.map(line => line.join('')).join('');
    if (rotateCache.has(key)) {
        return rotateCache.get(key)!;
    }
    const newPlatform = [];
    for (let i = 0; i < platform[0].length; i++) {
        const column = [];
        for (let j = platform.length - 1; j >= 0; j--) {
            column.push(platform[j][i]);
        }
        newPlatform.push(column);
    }
    rotateCache.set(key, newPlatform);
    return newPlatform;
}

const getLoad = (platform: string): number => {
    const platformArray = parseFile(platform);
    let load = 0;
    for (let i = 0; i < platformArray.length; i++) {
        for (let j = 0; j < platformArray[i].length; j++) {
            if (platformArray[i][j] === 'O') {
                load += platformArray.length - i;
            }
        }
    }
    return load;
}

const fullCycleCache = new Map<string, string>();


export const part2 = (input: string, iterations: number): number => {
    let platform = input;
    

    for (let i = 0; i < iterations; i++) {
        if (i % 1000000 === 0) {
            console.log(`Iteration ${i}`);
        }
        const key = platform;
        if (fullCycleCache.has(key)) {
            platform = fullCycleCache.get(key)!;
            continue;
        }
        console.log('Not using cache');
        let platformArray = parseFile(platform);
        for (let j = 0; j < 4; j++) {
            let tiltedNorth = [];
            for (let j = 0; j < platformArray[0].length; j++) {
                const column = [];
                for (let i = 0; i < platformArray.length; i++) {
                    column.push(platformArray[i][j]);
                }
                const tilted = tiltNorth(column);
                tiltedNorth.push(tilted);
            
            }
            for (let i = 0; i < tiltedNorth.length; i++) {
                for (let j = 0; j < tiltedNorth[i].length; j++) {
                    platformArray[j][i] = tiltedNorth[i][j];
                }
            }
            platformArray = rotateRight(platformArray);
        }
        const afterCycle = platformArray.map(line => line.join('')).join('\n');
        fullCycleCache.set(key, afterCycle);
        platform = afterCycle;
    }

    return getLoad(platform);
}