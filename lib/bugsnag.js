
const Bugsnag = require('@bugsnag/js');
const BugsnagPluginExpress = require('@bugsnag/plugin-express');

module.exports = function(app) {
    Bugsnag.start({
        apiKey: process.env.BUGSNAG_API_KEY,
        plugins: [BugsnagPluginExpress],
        enabledReleaseStages: (process.env.BUGSNAG_RELEASE_STAGES || 'production')
            .split(',')
            .map(value => value.trim())
    });

    const middleware = Bugsnag.getPlugin('express');

    // This must be the first piece of middleware in the stack.
    // It can only capture errors in downstream middleware
    app.use(middleware.requestHandler);

    return {
        middleware
    };
};