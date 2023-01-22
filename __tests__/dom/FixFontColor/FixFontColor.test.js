const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixFontColor = require('../../../dom/FixFontColor');

test('fixing font color', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixFontColor/error.html'), 'utf8'
    );
        
    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixFontColor/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixFontColor())).toBe(expected);
});