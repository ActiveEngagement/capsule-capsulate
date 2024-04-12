import fs from 'node:fs';
import path from 'node:path';
import { DecodeEntitiesInStyleAttributes } from '../../../src/dom/DecodeEntitiesInStyleAttributes';
import { manipulate } from '../../../src/helpers';

test('converting html entities inside of style attributes', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/DecodeEntitiesInStyleAttributes/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/DecodeEntitiesInStyleAttributes/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new DecodeEntitiesInStyleAttributes()])).toBe(expected);
});