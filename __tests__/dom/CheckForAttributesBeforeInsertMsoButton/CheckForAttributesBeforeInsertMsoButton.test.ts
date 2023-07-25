import fs from 'node:fs';
import path from 'node:path';
import FixMsoButtons from '../../../src/dom/FixMsoButtons';
import { manipulate } from '../../../src/helpers';

test('checking for attributes before inserting MSO button', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/CheckForAttributesBeforeInsertMsoButton/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/CheckForAttributesBeforeInsertMsoButton/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new FixMsoButtons()])).toBe(expected);
});