import { promises as fs } from 'fs';
import { getPartsSum } from '../getPartsSum';

describe('Day 3 - Part 1', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(getPartsSum(testData)).toBe(4361);
    });
});