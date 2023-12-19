type Part = {
    x: number;
    m: number;
    a: number;
    s: number;
}

type Rule = {
    condition?: {
        field: 'x' | 'm' | 'a' | 's';
        value: number;
        comparator: '<' | '>';
    }
    outcome: string;
}

const parseInput = (input: string): { parts: Part[], workflows: Record<string, Rule[]>} => {
    const [rawWorkflows, rawParts] = input.split('\n\n');

    const parts: Part[] = rawParts.split('\n').map((rawPart) => {
        const part: Partial<Part> = {};
        const valueString = rawPart.substring(1, rawPart.length - 1);
        const rawValues = valueString.split(',');
        for (const rawValue of rawValues) {
            const [field, value] = rawValue.split('=');
            if (['x', 'm', 'a', 's'].includes(field)) {
                part[field as keyof Part] = parseInt(value);
            } else {
                throw new Error(`Unrecognized field: ${field}`);
            }
        }
        return part as Part;
    });

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


    return { parts, workflows }
}

export const processPart = (workflows: Record<string, Rule[]>, part: Part, nextStep?: Rule[]): boolean => {
    if (!nextStep) {
        nextStep = workflows['in'];
    }
    for (const rule of nextStep) {
        if (rule.condition) {
            const { field, value, comparator } = rule.condition;
            if (comparator === '<') {
                if (part[field] < value) {
                    if (rule.outcome === 'A') {
                        return true;
                    }
                    if (rule.outcome === 'R') {
                        return false;
                    }
                    return processPart(workflows, part, workflows[rule.outcome]);
                }
            } else if (comparator === '>') {
                if (part[field] > value) {
                    if (rule.outcome === 'A') {
                        return true;
                    }
                    if (rule.outcome === 'R') {
                        return false;
                    }
                    return processPart(workflows, part, workflows[rule.outcome]);
                }
            } else {
                throw new Error(`Unrecognized comparator: ${comparator}`);
            }
        } else {
            if (rule.outcome === 'A') {
                return true;
            }
            if (rule.outcome === 'R') {
                return false;
            }
            return processPart(workflows, part, workflows[rule.outcome]);
        }
    }
    throw new Error('Ran out of rules');
}

export const part1 = (input: string): number => {
    const { parts, workflows } = parseInput(input);

    const validParts: Part[] = [];
    const rejectedParts: Part[] = [];

    for (const part of parts) {
        const state = processPart(workflows, part);
        if (state) {
            validParts.push(part);
        } else {
            rejectedParts.push(part);
        }
    }

    const total = validParts.reduce((acc, part) => acc + part.x + part.a + part.s + part.m, 0);

    return total;
}