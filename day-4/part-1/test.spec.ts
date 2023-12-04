import { promises as fs } from 'fs';
import { getSumOfPoints } from '../getSumOfPoints';

describe('Day 4 - Part 1', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(getSumOfPoints(testData)).toBe(13);
    });
});