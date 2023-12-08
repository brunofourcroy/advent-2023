import { promises as fs } from 'fs';
import { part2 } from './part2';

describe('Day 8 - Part 2', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/../test-data-3.txt`, 'utf-8');
        expect(part2(testData)).toBe(6);
    });
});