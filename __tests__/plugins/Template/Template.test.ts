const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const run = require('../../../lib/run');
const Beautify = require('../../../plugins/Beautify');
const Template = require('../../../plugins/Template');

test('compiling a template without a wrapper', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithoutWrapper/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithoutWrapper/expected.html'), 'utf8'
    );

    const response = await run(error, [
        new Beautify,
        new Template({
            data: {
                title: 'Title',
                subtitle: 'Subtitle'
            }
        })
    ]);

    expect(response).toBe(expected);
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

    const response = await run(error, [
        new Beautify(),
        new Template({
            src,
            data: {
                title: 'Title',
                subtitle: 'Subtitle'
            }
        })
    ]);

    expect(response).toBe(expected);
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

    const response = await run(error, [
        new Beautify,
        new Template({
            src,
            data: {
                title: 'Title',
                subtitle: 'Subtitle'
            }
        })
    ]);

    expect(response).toBe(expected);
});

test('compiling a template with a doctype', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithDoctype/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithDoctype/expected.html'), 'utf8'
    );

    const response = await run(error, [
        new Beautify,
        new Template({
            data: {
                title: 'Some Title'
            }
        })
    ]);

    expect(response).toBe(expected);
});

test('compiling a template without a doctype', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithoutDoctype/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Template/TemplateWithoutDoctype/expected.html'), 'utf8'
    );

    const response = await run(error, [
        new Beautify,
        new Template({
            data: {
                title: 'Some Title'
            }
        })
    ]);

    expect(response).toBe(expected);
});