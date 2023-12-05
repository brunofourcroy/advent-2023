import { promises as fs } from 'fs';
import { getLowestLocationWithRanges } from '../getLowestLocationWithRanges';

describe('Day 5 - Part 2', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(getLowestLocationWithRanges(testData)).toBe(46);
    });
});