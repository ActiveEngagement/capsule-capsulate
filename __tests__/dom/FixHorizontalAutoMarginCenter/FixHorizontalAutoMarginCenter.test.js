const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixTableAlignment = require('../../../dom/FixTableAlignment');

test('adding center alignment on table', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixHorizontalAutoMarginCenter/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixHorizontalAutoMarginCenter/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixTableAlignment())).toBe(expected);
});