import { promises as fs } from 'fs';
import { part1 } from '../part-1/part1';

(async () => {
    const start = new Date();
    const testData = await fs.readFile(`${__dirname}/../input.txt`, 'utf-8');

    const result = part1(testData, true);

    console.log(result);
    const end = new Date();
    console.log(`Execution took ${end.getTime() - start.getTime()} ms`);
})();