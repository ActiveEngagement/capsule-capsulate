import fs from 'node:fs';
import path from 'node:path';
import TaskRunner from '../../../src/TaskRunner';
import Beautify from '../../../src/plugins/Beautify';
import Template from '../../../src/plugins/Template';

test('compiling a template without a wrapper', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithoutWrapper/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithoutWrapper/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new Template({
            data: {
                title: 'Title',
                subtitle: 'Subtitle'
            }
        })
    ]);

    expect(await runner.process(error)).toBe(expected);
});

test('compiling a template with a wrapper fragment', async() => {
    const src = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithWrapperFragment/wrapper.html'), 'utf8'
    );

    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithWrapperFragment/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithWrapperFragment/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new Template({
            data: {
                title: 'Title',
                subtitle: 'Subtitle'
            }
        })
    ]);

    expect(await runner.process(error)).toBe(expected);
});

test('compiling a template with a wrapper', async() => {
    const src = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithWrapper/wrapper.html'), 'utf8'
    );

    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithWrapper/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithWrapper/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new Template({
            src,
            data: {
                title: 'Title',
                subtitle: 'Subtitle'
            }
        })
    ]);

    expect(await runner.process(error)).toBe(expected);
});

test('compiling a template with a doctype', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithDoctype/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithDoctype/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new Template({
            data: {
                title: 'Some Title'
            }
        })
    ]);

    expect(await runner.process(error)).toBe(expected);
});

test('compiling a template without a doctype', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithoutDoctype/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithoutDoctype/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new Template({
            data: {
                title: 'Some Title'
            }
        })
    ]);

    expect(await runner.process(error)).toBe(expected);
});

test('the preview text on document without a template wrapper', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/UnwrappedDocumentWithPreviewText/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/UnwrappedDocumentWithPreviewText/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new Template({
            previewText: '<div style="display:none">test</div>',
            data: {
                title: 'Some Title',
                subtitle: 'Subtitle'
            }
        })
    ]);

    expect(await runner.process(error)).toBe(expected);
});

test('the preview text on document with a template wrapper', async() => {
    const src = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/WrappedDocumentWithPreviewText/wrapper.html'), 'utf8'
    );
    
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/WrappedDocumentWithPreviewText/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/WrappedDocumentWithPreviewText/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new Template({
            src,
            previewText: '<div style="display:none">test</div>',
            data: {
                title: 'Some Title',
                subtitle: 'Subtitle'
            }
        })
    ]);

    expect(await runner.process(error)).toBe(expected);
});