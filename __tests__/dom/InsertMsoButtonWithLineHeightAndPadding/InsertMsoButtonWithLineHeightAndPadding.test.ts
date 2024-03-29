import fs from 'node:fs';
import path from 'node:path';
import { FixMsoButtons } from '../../../src/dom/FixMsoButtons';
import { manipulate } from '../../../src/helpers';

test('inserting mso button with line height and padding', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/InsertMsoButtonWithLineHeightAndPadding/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/InsertMsoButtonWithLineHeightAndPadding/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new FixMsoButtons()])).toBe(expected);
});