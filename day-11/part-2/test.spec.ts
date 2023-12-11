import { promises as fs } from 'fs';
import { part2 } from './part2';

describe('Day 11 - Part 2', () => {
    it('works with expansion 10', async() => {
        const testData = await fs.readFile(`${__dirname}/../test-data.txt`, 'utf-8');

        expect(part2(testData, 10)).toBe(1030);
    });
    it('works with expansion 100', async() => {
        const testData = await fs.readFile(`${__dirname}/../test-data.txt`, 'utf-8');

        expect(part2(testData, 100)).toBe(8410);
    });
});