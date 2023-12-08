import { promises as fs } from 'fs';
import { part1 } from './part1';

describe('Day 8 - Part 1', () => {
    it('works for example 1', async() => {
        const testData = await fs.readFile(`${__dirname}/../test-data.txt`, 'utf-8');

        expect(part1(testData)).toBe(2);
    });
    it('works for example 2', async() => {
        const testData = await fs.readFile(`${__dirname}/../test-data-2.txt`, 'utf-8');

        expect(part1(testData)).toBe(6);
    });
});