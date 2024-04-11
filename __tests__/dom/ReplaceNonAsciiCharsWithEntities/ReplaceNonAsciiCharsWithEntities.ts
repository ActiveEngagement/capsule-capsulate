import fs from 'node:fs';
import path from 'node:path';
import { ReplaceNonAsciiCharsWithEntities } from '../../../src/dom/ReplaceNonAsciiCharsWithEntities';
import { manipulate } from '../../../src/helpers';

test('replacing non-ascii characters with HTML entities', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/ReplaceNonAsciiCharsWithEntities/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/ReplaceNonAsciiCharsWithEntities/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new ReplaceNonAsciiCharsWithEntities()])).toBe(expected);
});