import { promises as fs } from 'fs';
import { getPossibleGames } from '../get-possible-games';

(async () => {
    const start = new Date();
    const testData = await fs.readFile(`${__dirname}/input.txt`, 'utf-8');

    const result = getPossibleGames(testData, 12, 13, 14);

    console.log(result);
    const end = new Date();
    console.log(`Execution took ${end.getTime() - start.getTime()} ms`);
})();