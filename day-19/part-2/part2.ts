type PartRange = {
    x?: [number, number];
    m?: [number, number];
    a?: [number, number];
    s?: [number, number];
}

type Rule = {
    condition?: {
        field: 'x' | 'm' | 'a' | 's';
        value: number;
        comparator: '<' | '>';
    }
    outcome: string;
}

const parseInput = (input: string): { workflows: Record<string, Rule[]>} => {
    const [rawWorkflows, rawParts] = input.split('\n\n');

    const workflows: Record<string, Rule[]> = {};
    for (const rawWorkflow of rawWorkflows.split('\n')) {
        const [name, rawRules] = rawWorkflow.substring(0, rawWorkflow.length - 1).split('{');
        const rules: Rule[] = [];
        for (const rawRule of rawRules.split(',')) {
            if (rawRule.includes(':')) {
                const [rule, outcome] = rawRule.split(':');
                if (rule.includes('<')) {
                    const [field, value] = rule.split('<');
                    rules.push({
                        condition: {
                            field: field as 'x' | 'm' | 'a' | 's',
                            value: parseInt(value),
                            comparator: '<'
                        },
                        outcome
                    });
                } else if (rule.includes('>')) {
                    const [field, value] = rule.split('>');
                    rules.push({
                        condition: {
                            field: field as 'x' | 'm' | 'a' | 's',
                            value: parseInt(value),
                            comparator: '>'
                        },
                        outcome
                    });
                } else {
                    throw new Error(`Unrecognized rule: ${rule}`);
                }
            } else {
                rules.push({
                    outcome: rawRule
                });
            }
        }
        workflows[name] = rules;
    }


    return { workflows }
}

export const getValidRange = (rule: Rule): PartRange => {
    if (!rule.condition) {
        return {
            x: [1, 4000],
            m: [1, 4000],
            a: [1, 4000],
            s: [1, 4000],
        }
    }
    if (rule.condition.comparator === '<') {
        return {
            [rule.condition.field]: [1, rule.condition.value - 1]
        }
    }
    if (rule.condition.comparator === '>') {
        return {
            [rule.condition.field]: [rule.condition.value + 1, 4000]
        }
    }
    throw new Error(`Unrecognized comparator: ${rule.condition.comparator}`);
}

const getInvalidRange = (rule: Rule): PartRange => {
    if (!rule.condition) {
        console.log(rule);
        throw new Error('No invalid range when there is no condition');
    }
    if (rule.condition.comparator === '<') {
        return {
            [rule.condition.field]: [rule.condition.value, 4000]
        }
    }
    if (rule.condition.comparator === '>') {
        return {
            [rule.condition.field]: [1, rule.condition.value]
        }
    }
    throw new Error(`Unrecognized comparator: ${rule.condition.comparator}`);
}

const mergeRanges = (ranges: PartRange[]): PartRange => {
    const mergedRange: PartRange = {};
    for (const range of ranges) {
        for (const ufield in range) {
            const field = ufield as keyof PartRange;
            if (!mergedRange[field]) {
                mergedRange[field] = range[field];
            } else {
                const mergedRangeForField = mergedRange[field] as [number, number];
                const rangeForField = range[field] as [number, number];
                // No overlap
                // Will this happen?
                if (mergedRangeForField[1] < rangeForField[0] || mergedRangeForField[0] > rangeForField[1]) {
                    throw new Error(`No overlap between ${mergedRangeForField} and ${rangeForField}`);
                }
                // Take intersection
                mergedRange[field] = [Math.max(mergedRangeForField[0], rangeForField[0]), Math.min(mergedRangeForField[1], rangeForField[1])];
            }
        }
    }

    return mergedRange;
}
const allRange: PartRange = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
}

export const getValidInputs = (workflows: Record<string, Rule[]>, ruleName: string, destination: string, prevRange?: PartRange): PartRange[] => {
    const rules = workflows[ruleName];
    const ruleRanges: PartRange[] = [];
    if (rules.every(rule => rule.outcome === 'A')) {
        ruleRanges.push(
            mergeRanges([allRange, ...(prevRange ? [prevRange] : [])]));
    } else {
        let currentRange: PartRange = {};
        let lastMatchingRule: number | null = null;
        for (let i = rules.length - 1; i >= 0; i--) {
            if (rules[i].outcome === destination) {
                lastMatchingRule = i;
                break
            }
        }
        if (typeof lastMatchingRule !== 'number') {
            throw new Error(`No matching rule found for ${destination}`);
        }
        for (let i = 0; i <= lastMatchingRule; i++) {
            const rule = rules[i];
            if (rule.outcome === destination) {
                if (i !== lastMatchingRule && rules.slice(i + 1, lastMatchingRule + 1).every(rule => rule.outcome === 'A')) {
                    ruleRanges.push(mergeRanges([currentRange, allRange]));
                    break;
                } else {
                    ruleRanges.push(mergeRanges([currentRange, getValidRange(rule)]));
                }
            } else {
                currentRange = mergeRanges([currentRange, getInvalidRange(rule)]);
            }        
        }
        for (let i = 0; i < ruleRanges.length; i++) {
            ruleRanges[i] = mergeRanges([ruleRanges[i], ...(prevRange ? [prevRange] : [])]);
        }
    }

    if (ruleName === 'in') {
        for (let i = 0; i < ruleRanges.length; i++) {
            const range = ruleRanges[i];
            if (!range.a) {
                range.a = [1, 4000];
            }
            if (!range.m) {
                range.m = [1, 4000];
            }
            if (!range.s) {
                range.s = [1, 4000];
            }
            if (!range.x) {
                range.x = [1, 4000];
            }
        }
        return ruleRanges;
    }

    // Asummed one based on input
    const prevRule = Object.entries(workflows).find(([key, value]) => value.some(rule => rule.outcome === ruleName));
    if (!prevRule) {
        throw new Error(`No previous rule found for ${ruleName}`);
    }

    return ruleRanges.reduce((acc: PartRange[], range) => {
        return [...acc, ...getValidInputs(workflows, prevRule[0], ruleName, range)];
    }, []);
}

export const part2 = (input: string): number => {
    const { workflows } = parseInput(input);

    let total = 0
    for (const key in workflows) {
        if (workflows[key].some(rule => rule.outcome === 'A')) {
            const ranges = getValidInputs(workflows, key, 'A');
            console.log(`Ranges for ${key}`);
            console.log(ranges);
            for (const range of ranges) {
                const possibilities = Object.values(range).reduce((acc, [min, max]) => acc * (max - min + 1), 1); 
                total += possibilities;
            }
        }
    }

    return total;
}