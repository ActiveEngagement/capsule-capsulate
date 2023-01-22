const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const ApplyListStyles = require('../../../dom/ApplyListStyles');

test('applying the default styles', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/ApplyListStyles/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/ApplyListStyles/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new ApplyListStyles())).toBe(expected);
});