import { promises as fs } from 'fs';
import { part1 } from './part1';

describe('Day 10 - Part 1', () => {
    it('works for the first example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(part1(testData)).toBe(4);
    });
    it('works for the second example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data-2.txt`, 'utf-8');

        expect(part1(testData)).toBe(8);
    });
});