import fs from 'node:fs';
import path from 'node:path';
import { PreviewText } from '../../../../src';
import { TaskRunner } from '../../../../src/TaskRunner';
import { Beautify } from '../../../../src/plugins/Beautify';

test('adding the preview text using plain text to a document with it', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/PreviewText/DocumentWithPreviewTextUsingHtmlString/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/PreviewText/DocumentWithPreviewTextUsingHtmlString/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new PreviewText({
            html: '<div>some preview text</div>'
        }),
        new Beautify,
    ]);

    expect(await runner.process(error)).toBe(expected);
});