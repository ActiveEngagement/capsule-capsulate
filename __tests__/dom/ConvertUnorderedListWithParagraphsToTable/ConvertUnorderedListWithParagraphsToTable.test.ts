import fs from 'node:fs';
import path from 'node:path';
import ConvertListsToTables from '../../../src/dom/ConvertListsToTables';
import { manipulate } from '../../../src/helpers';

test('converting unordered list with paragraphs to table', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/ConvertUnorderedListWithParagraphsToTable/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/ConvertUnorderedListWithParagraphsToTable/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new ConvertListsToTables()])).toBe(expected);
});