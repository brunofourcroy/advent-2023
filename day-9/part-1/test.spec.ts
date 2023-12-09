import { promises as fs } from 'fs';
import { part1 } from './part1';

describe('Day 9 - Part 1', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/../test-data.txt`, 'utf-8');

        expect(part1(testData)).toBe(114);
    });
});