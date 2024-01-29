import fs from 'node:fs';
import path from 'node:path';
import { FixFloatAlignment } from '../../../src/dom/FixFloatAlignment';
import { manipulate } from '../../../src/helpers';

test('do not add float to align left paragraphs', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/DoNotAddFloatToAlignLeftParagraph/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/DoNotAddFloatToAlignLeftParagraph/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new FixFloatAlignment()])).toBe(expected);
});