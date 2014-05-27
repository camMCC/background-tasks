interface BackgroundTask {
    /**
    * A background task function.  A task function will be executed once per tick until it returns true.
    * @returns {boolean} Return true to indicate processing completion.
    */
    (): boolean;
}
declare class backgroundTasks {
    private stack;
    /**
    * This is the interval value.  0 to indicate unset, and other value to
    * indicate an interval is running.
    */
    private interval;
    /**
    * The speed in milliseconds between ticks.  Effectively how often one should attempt to process elements in the task queue.
    */
    private rate;
    /**
    * The currently processing background task.
    */
    private current;
    /**
    * Creates a new background tasks queue.  Used for long running, asynchronous tasks.
    */
    constructor(rate: number);
    /**
    * Used to add tasks to the queue.
    * @param func {BackgroundTask} The background task to add to the task stack.  See interface BackgroundTask for details.
    */
    public push(func: BackgroundTask): void;
    /**
    * Returns the number of items in the task queue.
    */
    public length : number;
    /**
    * Internal method that processes the next item in the task stack.
    */
    private next();
    /**
     * Resets the timer to begin counting from now instead of whenever it had been started.
     */
    public resetTimer(): void;
}
