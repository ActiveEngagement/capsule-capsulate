import fs from 'fs';
import path from 'path';
import { TaskRunner } from '../../../src/TaskRunner';
import { Beautify } from '../../../src/plugins/Beautify';
import { InlineCss } from '../../../src/plugins/InlineCss';
import { PreserveHeadTag } from '../../../src/plugins/PreserveHeadTag';
import { Template } from '../../../src/plugins/Template';

test('inlining the CSS in a template', async() => {
    const wrapper = fs.readFileSync(
        path.resolve('__tests__/plugins/InlineCssWithTemplate/wrapper.html'), 'utf8'
    );

    const document = fs.readFileSync(
        path.resolve('__tests__/plugins/InlineCssWithTemplate/document.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/InlineCssWithTemplate/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new PreserveHeadTag,
        new Template({
            src: wrapper
        }),
        new InlineCss,
    ]);

    const response = await runner.process(document);

    expect(response).toBe(expected);
});