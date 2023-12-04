import { promises as fs } from 'fs';
import { getNumOfCards } from '../getNumOfCards';

(async () => {
    const testData = await fs.readFile(`${__dirname}/input.txt`, 'utf-8');

    const result = getNumOfCards(testData);

    console.log(result);
})();