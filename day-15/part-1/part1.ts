
export const part1 = (input: string): number => {
    const strings = input.replace(/\n/g, '').split(',');
    let total = 0;

    for (const string of strings) {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            hash = ((hash + string.charCodeAt(i)) * 17) % 256;
        }
        total += hash;
    }

    return total;
}