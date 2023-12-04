type Game = {
    maxRed: number;
    maxGreen: number;
    maxBlue: number;
}

type Round = {
    red?: number;
    green?: number;
    blue?: number;
}

export const getMaxCounts = (input: string): Game[] => {
    // Split in lines
    const lines = input.split('\n')

    return lines.map((line) => {
        const [game, results] = line.split(':');
        const rounds: Round[] = results.split(';').map(round => {
            const r: Round = {};
            const colours = round.split(',').map(s => s.trim());
            colours.forEach((colour) => {
                if (colour.includes('blue')) {
                    const count = colour.split(' ');
                    r.blue = parseInt(count[0]);
                }
                if (colour.includes('green')) {
                    const count = colour.split(' ');
                    r.green = parseInt(count[0]);
                }
                if (colour.includes('red')) {
                    const count = colour.split(' ');
                    r.red = parseInt(count[0]);
                }
            });
            return r;
        });
        const maxRed = Math.max(...rounds.map(r => r.red || 0));
        const maxGreen = Math.max(...rounds.map(r => r.green || 0));
        const maxBlue = Math.max(...rounds.map(r => r.blue || 0));
        return {
            maxRed,
            maxGreen,
            maxBlue,
        };
    }, []);
};