import { type Plugin } from './Plugin';
export type TaskRunnerReduceFunction<T> = (carry: Awaited<T>, task: Plugin) => Promise<T>;
export class TaskRunner {
    protected tasks: Plugin[];
    constructor(tasks: Plugin[]);
    process(src: string): Promise<string>;
    reduce<T>(value: T, fn: TaskRunnerReduceFunction<T>): Promise<T>;
}
