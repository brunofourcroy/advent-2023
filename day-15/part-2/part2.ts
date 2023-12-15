
const getHash = (string: string): number => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = ((hash + string.charCodeAt(i)) * 17) % 256;
    }
    return hash;
}

type Lens = {
    label: string;
    power: number;
}

export const part2 = (input: string): number => {
    const operations = input.replace(/\n/g, '').split(',');

    const boxes: Lens[][] = [];
    for (let i = 0; i < 256; i++) {
        boxes.push([]);
    }

    for (const op of operations) {
        if (op.endsWith('-')) {
            const label = op.slice(0, -1);
            const boxId = getHash(label);
            const existing = boxes[boxId].findIndex(lens => lens.label === label);
            if (existing > -1) {
                boxes[boxId].splice(boxes[boxId].findIndex(lens => lens.label === label), 1); 
            }
            
        } else {
            const [label, power] = op.split('=');
            const boxId = getHash(label);
            const existing = boxes[boxId].findIndex(lens => lens.label === label);
            if (existing === -1) {
                boxes[boxId].push({ label, power: parseInt(power) });
            } else {
                boxes[boxId][existing].power = parseInt(power);
            }
        }
    }

    let totalPower: number = 0;
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes[i].length; j++) {
            totalPower += (1 + i) * (j + 1) * boxes[i][j].power;
        }
    }

    return totalPower;
}