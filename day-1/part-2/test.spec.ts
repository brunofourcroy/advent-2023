import { promises as fs } from 'fs';
import { getCalibrationValue } from '../get-calibration-value';

describe('Day 1 - Part 2', () => {
    it('works for the example', async() => {
        const testData = await fs.readFile(`${__dirname}/test-data.txt`, 'utf-8');

        expect(getCalibrationValue(testData)).toBe(281);
    });
    it('works when numbers share characters', async() => {
        const testData = 'eightwo';

        expect(getCalibrationValue(testData)).toBe(82);
    });
});