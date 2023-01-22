const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const ConvertListsToTables = require('../../../dom/ConvertListsToTables');

test('converting unordered list with paragraphs to table', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/ConvertUnorderedListWithParagraphsToTable/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/ConvertUnorderedListWithParagraphsToTable/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new ConvertListsToTables())).toBe(expected);
});