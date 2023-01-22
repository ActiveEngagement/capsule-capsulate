const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixBackgroundColor = require('../../../dom/FixBackgroundColor');

test('fixing background color', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixBackgroundColor/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixBackgroundColor/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixBackgroundColor())).toBe(expected);
});