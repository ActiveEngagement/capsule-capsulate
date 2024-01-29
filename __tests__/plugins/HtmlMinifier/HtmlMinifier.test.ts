import fs from 'node:fs';
import path from 'node:path';
import { TaskRunner } from '../../../src/TaskRunner';
import { Beautify } from '../../../src/plugins/Beautify';
import { HtmlMinifier } from '../../../src/plugins/HtmlMinifier';

test('minifying a template', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/HtmlMinifier/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/HtmlMinifier/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new HtmlMinifier
    ]);

    expect(await runner.process(error)).toBe(expected);
});