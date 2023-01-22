const TaskRunner = require('./TaskRunner');

module.exports = async(src, plugins, options = {}) => {
    const runner = TaskRunner.make(plugins, options);

    return await runner.process(src);
};