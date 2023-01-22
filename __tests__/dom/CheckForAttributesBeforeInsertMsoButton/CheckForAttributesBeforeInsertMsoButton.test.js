const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixMsoButtons = require('../../../dom/FixMsoButtons');

test('checking for attributes before inserting MSO button', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/CheckForAttributesBeforeInsertMsoButton/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/CheckForAttributesBeforeInsertMsoButton/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixMsoButtons())).toBe(expected);
});