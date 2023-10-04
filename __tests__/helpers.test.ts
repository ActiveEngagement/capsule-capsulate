import fs from 'node:fs';
import path from 'node:path';
import { extractSourceCodes } from '../src/helpers';

test('extracting source codes.', async() => {
    const html = fs.readFileSync(
        path.resolve('__tests__/dom/ReplaceQueryStrings/error.html'), 'utf8'
    );

    expect(extractSourceCodes(html)).toEqual({
        source_code: [
            'ignore',
            'xxxxx',
            'yyyyy',
            'zzzzz'
        ],
        a: [
            'b',
            'c'
        ]
    });
});
