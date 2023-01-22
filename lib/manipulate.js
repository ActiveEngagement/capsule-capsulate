const ManipulateDom = require('../plugins/ManipulateDom');
const TaskRunner = require('./TaskRunner');

module.exports = async(src, ...plugins) => {
    const runner = TaskRunner.make([
        new ManipulateDom(plugins)
    ]);

    return await runner.process(src);
};