const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixResponsiveImages = require('../../../dom/FixResponsiveImages');

test('fixing responsive images', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixResponsiveImages/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixResponsiveImages/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixResponsiveImages())).toBe(expected);
});