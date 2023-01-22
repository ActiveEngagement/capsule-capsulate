const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixTableAlignment = require('../../../dom/FixTableAlignment');

test('adding right alignment on table', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixHorizontalAutoMarginRight/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixHorizontalAutoMarginRight/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixTableAlignment())).toBe(expected);
});