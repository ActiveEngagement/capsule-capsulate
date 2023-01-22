const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const ConvertListsToTables = require('../../../dom/ConvertListsToTables');

test('converting unordered list with plain text to table', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/ConvertUnorderedListWithPlainTextToTable/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/ConvertUnorderedListWithPlainTextToTable/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new ConvertListsToTables())).toBe(expected);
});