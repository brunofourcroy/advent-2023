import { promises as fs } from 'fs';
import { part2 } from './part2';

(async () => {
    const start = new Date();
    const testData = await fs.readFile(`${__dirname}/../input.txt`, 'utf-8');

    const result = part2(testData, 1000000000);

    console.log(result);
    const end = new Date();
    console.log(`Execution took ${end.getTime() - start.getTime()} ms`);
})();