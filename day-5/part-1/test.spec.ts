import { promises as fs } from 'fs';
import { getLowestLocation } from '../getLowestLocation';

describe('Day 5 - Part 1', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(getLowestLocation(testData)).toBe(35);
    });
});