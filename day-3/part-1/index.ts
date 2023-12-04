import { promises as fs } from 'fs';
import { getPartsSum } from '../getPartsSum';

(async () => {
    const testData = await fs.readFile(`${__dirname}/input.txt`, 'utf-8');

    const result = getPartsSum(testData);

    console.log(result);
})();