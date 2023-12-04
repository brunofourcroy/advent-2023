import { promises as fs } from 'fs';
import { getPowerOfGames } from '../get-power-of-games';

describe('Day 2 - Part 2', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(getPowerOfGames(testData)).toBe(2286);
    });
});