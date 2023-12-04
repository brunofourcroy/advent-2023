import { promises as fs } from 'fs';
import { getPowerOfGames } from '../get-power-of-games';

(async () => {
    const start = new Date();
    const testData = await fs.readFile(`${__dirname}/input.txt`, 'utf-8');

    const result = getPowerOfGames(testData);

    console.log(result);
    const end = new Date();
    console.log(`Execution took ${end.getTime() - start.getTime()} ms`);
})();