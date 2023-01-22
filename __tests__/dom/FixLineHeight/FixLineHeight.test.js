const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixLineHeight = require('../../../dom/FixLineHeight');

test('fixing line heights', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixLineHeight/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixLineHeight/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixLineHeight())).toBe(expected);
});