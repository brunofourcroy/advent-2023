export const getCalibrationValue = (input: string): number => {
    // Split in lines
    const lines = input
        .replace(/one/g, 'o1ne')
        .replace(/two/g, 't2wo')
        .replace(/three/g, 't3hree')
        .replace(/four/g, 'f4our')
        .replace(/five/g, 'f5ive')
        .replace(/six/g, 's6ix')
        .replace(/seven/g, 's7even')
        .replace(/eight/g, 'e8ight')
        .replace(/nine/g, 'n9ine')
        .replace(/zero/g, 'z0ero')
    .split('\n')

    return lines.reduce((acc: number, line: string) => {
        console.log(`Line: ${line}`);
        // Should pick each single digit or 'one', 'two', 'three' in letters
        const matches = line.match(/\d{1}/g);

        if (matches) {
            const firstDigit = parseInt(matches[0], 10);
            const lastDigit = parseInt(matches[matches.length - 1], 10);
            const lineValue = parseInt(`${firstDigit}${lastDigit}`, 10);
        
            console.log(`Line value: ${lineValue}`);
            return acc + lineValue;
        }
        return acc;
    }, 0);
};