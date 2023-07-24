// jest.useFakeTimers()

const capsulate = require("../lib/capsulate");

const { test, expect } = global;

test('that the capsulate() function.', async() => {
    const results = await capsulate('<span>Contents</span>', {
        template: {
            src: '<div>{{ contents }}</div>'
        }
    });

    expect(results).toBe('<div><span>Contents</span></div>');
});
