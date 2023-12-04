import { promises as fs } from 'fs';
import { getCalibrationValue } from '../get-calibration-value';

(async () => {
    const testData = await fs.readFile(`${__dirname}/input.txt`, 'utf-8');

    const result = getCalibrationValue(testData);

    console.log(result);
})();