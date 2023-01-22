const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixTableAlignment = require('../../../dom/FixTableAlignment');

test('adding left alignment on table', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixHorizontalAutoMarginLeft/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixHorizontalAutoMarginLeft/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixTableAlignment())).toBe(expected);
});