const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixMsoWrapper = require('../../../dom/FixMsoWrapper');

test('wrapping mso on div with float right', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/WrapMsoOnDivWithFloatRight/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/WrapMsoOnDivWithFloatRight/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixMsoWrapper())).toBe(expected);
});