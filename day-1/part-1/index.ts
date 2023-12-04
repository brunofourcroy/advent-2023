import { promises as fs } from 'fs';
import { getCalibrationValue } from '../get-calibration-value';

(async () => {
    const start = new Date();
    const testData = await fs.readFile(`${__dirname}/input.txt`, 'utf-8');

    const result = getCalibrationValue(testData);

    console.log(result);
    const end = new Date();
    console.log(`Execution took ${end.getTime() - start.getTime()} ms`);
})();