const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixFloatAlignment = require('../../../dom/FixFloatAlignment');

test('do not add float to align left paragraphs', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/DoNotAddFloatToAlignLeftParagraph/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/DoNotAddFloatToAlignLeftParagraph/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixFloatAlignment())).toBe(expected);
});