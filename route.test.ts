import { createRule } from './route.ts'

const _a = createRule({
    type: 'logical',
    mode: 'and',
    rules: [
        {
            rule_set: ['steam'],
        },
        {
            invert: true,
            rule_set: ['steam-cn'],
        },
    ],
    // action: 'route',
    outbound: 'select',
}, {
    assertExistOutbounds: ['select'],
    assertExistRuleSet: ['steam', 'steam-cn'],
})
