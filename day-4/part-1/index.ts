import { promises as fs } from 'fs';
import { getSumOfPoints } from '../getSumOfPoints';

(async () => {
    const testData = await fs.readFile(`${__dirname}/input.txt`, 'utf-8');

    const result = getSumOfPoints(testData);

    console.log(result);
})();