import { promises as fs } from 'fs';
import { getNumOfCards } from '../getNumOfCards';

describe('Day 4 - Part 2', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(getNumOfCards(testData)).toBe(30);
    });
});