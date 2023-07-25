import Plugin from "./Plugin";
import { cheerio } from './helpers';

export type TaskRunnerOptions = {
    fragment?: boolean
}

export type TaskRunnerReduceFunction<T> = (carry: Awaited<T>, task: Plugin) => Promise<T>

export class TaskRunner {

    constructor(
        protected tasks: Plugin[],
        protected options: TaskRunnerOptions = {}
    ) {
        //
    }

    async process(src: string) {
        src = await this.reduce(src, async (carry, task) => {
            return await task.initialize(await carry);
        });

        let $ = cheerio(src);

        $ = await this.reduce(
            $, async (carry, task) => await task.preprocess(carry)
        );

        $ = await this.reduce(
            $, async (carry, task) => await task.process(carry)
        );

        $ = await this.reduce(
            $, async (carry, task) => await task.postprocess(carry)
        );

        return this.reduce(
            $.html(), async (carry, task) => await task.transform(carry)
        );
    }

    reduce<T>(value: T, fn: TaskRunnerReduceFunction<T>) {        
        return this.tasks.reduce<Promise<T>>(async (carry, task) => {
            return await fn(await carry, task);
        }, Promise.resolve(value));
    }
    
};