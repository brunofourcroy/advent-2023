import { promises as fs } from 'fs';
import { getGearRatiosSum } from '../getGearRatiosSum';

describe('Day 2 - Part 2', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(getGearRatiosSum(testData)).toBe(467835);
    });
});