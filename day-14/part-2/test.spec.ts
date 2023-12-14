import { promises as fs } from 'fs';
import { part2 } from './part2';

describe('Day 14 - Part 2', () => {
    it('works for the first example', async() => {
        const testData = await fs.readFile(`${__dirname}/../test-data.txt`, 'utf-8');

        expect(part2(testData, 1000000000)).toBe(64);
    });
});