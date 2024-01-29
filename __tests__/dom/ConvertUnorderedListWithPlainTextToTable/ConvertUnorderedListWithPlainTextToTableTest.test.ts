import fs from 'node:fs';
import path from 'node:path';
import { ConvertListsToTables } from '../../../src/dom/ConvertListsToTables';
import { manipulate } from '../../../src/helpers';

test('converting unordered list with plain text to table', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/ConvertUnorderedListWithPlainTextToTable/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/ConvertUnorderedListWithPlainTextToTable/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new ConvertListsToTables()])).toBe(expected);
});