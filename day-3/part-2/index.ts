import { promises as fs } from 'fs';
import { getGearRatiosSum } from '../getGearRatiosSum';

(async () => {
    const testData = await fs.readFile(`${__dirname}/input.txt`, 'utf-8');

    const result = getGearRatiosSum(testData);

    console.log(result);
})();