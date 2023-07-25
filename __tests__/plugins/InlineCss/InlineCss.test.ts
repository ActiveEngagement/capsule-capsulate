import fs from 'node:fs';
import path from 'node:path';
import { TaskRunner } from '../../../src/TaskRunner';
import Beautify from '../../../src/plugins/Beautify';
import InlineCss from '../../../src/plugins/InlineCss';

test('inlining the CSS in a template', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/InlineCss/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/InlineCss/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new InlineCss
    ]);

    const response = await runner.process(error);

    expect(response).toBe(expected);
});