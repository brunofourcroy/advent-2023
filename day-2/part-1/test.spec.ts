import { promises as fs } from 'fs';
import { getPossibleGames } from '../get-possible-games';

describe('Day 1 - Part 1', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(getPossibleGames(testData, 12, 13, 14)).toBe(8);
    });
});