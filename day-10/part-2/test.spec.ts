import { promises as fs } from 'fs';
import { part2 } from './part2';

describe('Day 10 - Part 2', () => {
    it('works for the first example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(part2(testData)).toBe(4);
    });
    it('works for the second example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data-2.txt`, 'utf-8');

        expect(part2(testData)).toBe(4);
    });
    it('works for the third example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data-3.txt`, 'utf-8');

        expect(part2(testData)).toBe(8);
    });
    it('works for the fourth example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data-4.txt`, 'utf-8');

        expect(part2(testData)).toBe(10);
    });
});