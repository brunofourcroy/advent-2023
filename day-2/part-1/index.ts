import { promises as fs } from 'fs';
import { getPossibleGames } from '../get-possible-games';

(async () => {
    const testData = await fs.readFile(`${__dirname}/input.txt`, 'utf-8');

    const result = getPossibleGames(testData, 12, 13, 14);

    console.log(result);
})();