const areSymetric = (a: string[], b: string[]): boolean => {
    if (a.length > b.length) {
        a = a.slice(a.length - b.length);
    }
    if (b.length > a.length) {
        b = b.slice(0, a.length);
    }
    // We check all characters and we only 1 different in total
    let differences = 0;
    const linesAreMatching = a.every((line, i) => {
        if (line === b[b.length - 1 - i]) {
            return true;
        }
        for (let j = 0; j < line.length; j++) {
            if (line[j] !== b[b.length - 1 - i][j]) {
                differences++;
                if (differences > 1) {
                    return false;
                }
            }
        }
        return true;
    });
    // Making sure the "original" symetry is not returned by checking we did get just one difference.
    return linesAreMatching && differences === 1;
};

const getHorizontalSymetryValue = (lines: string[]): number | null => {
    for (let i = 1; i < lines.length; i++) {
        const [half1, half2] = [lines.slice(0, i), lines.slice(i)];
        if (areSymetric(half1, half2)) {
            return i;
        }
    }
    return null;
};

const rotateRight = (lines: string[]): string[] => {
    const newLines = [];
    for (let j= 0; j < lines[0].length; j++) {
        newLines.push('');
        for (let i = lines.length - 1; i >= 0; i--) {
            newLines[j] += lines[i][j];
        }
    }

    return newLines;
}

const getSymetryValue = (input: string): number => {
    const lines = input.split('\n');

    const horizontalSymetryValue = (getHorizontalSymetryValue(lines) ?? 0) * 100;

    if (horizontalSymetryValue) {
        return horizontalSymetryValue;
    }

    const verticalSymetryValue = getHorizontalSymetryValue(rotateRight(lines));

    if (verticalSymetryValue) {
        return verticalSymetryValue;
    }

    throw new Error('Could not find any pattern oh no wtf');
};

export const part2 = (input: string): number => {
    const patterns = input.split('\n\n');
    
    return patterns.reduce((acc, pattern, i) => {
        const val = getSymetryValue(pattern);
        return acc + val;
    }, 0);
}