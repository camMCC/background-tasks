
interface BackgroundTask {
    /**
     * A background task function.  A task function will be executed once per tick until it returns true.
     * @returns {boolean} Return true to indicate processing completion.
     */
    (): boolean;
}

class backgroundTasks {
    private stack: BackgroundTask[] = [];
    /**
     * This is the interval value.  0 to indicate unset, and other value to
     * indicate an interval is running.
     */
    private interval: number = 0;
    /**
     * The speed in milliseconds between ticks.  Effectively how often one should attempt to process elements in the task queue.
     */
    private rate: number;
    /**
     * The currently processing background task.
     */
    private current: BackgroundTask = null;

    /**
     * Creates a new background tasks queue.  Used for long running, asynchronous tasks.
     */
    constructor(rate: number) {
        this.rate = rate;
    }

    /**
     * Used to add tasks to the queue.
     * @param func {BackgroundTask} The background task to add to the task stack.  See interface BackgroundTask for details.
     */
    public push(func: BackgroundTask): void {
        // Add to the task stack
        this.stack.push(func);

        // Start the background processing
        if (!this.interval) {
            this.interval = setInterval(()=> {
                this.next();
            }, this.rate);
        }
    }

    /**
     * Returns the number of items in the task queue.
     */
    public get length(): number {
        if (this.current) {
            return this.stack.length + 1;
        } else {
            return this.stack.length;
        }
    }

    /**
     * Internal method that processes the next item in the task stack.
     */
    private next() : void {
        if (!this.current) {
            if (!this.stack.length) {
                // No more items, stop the task engine
                clearInterval(this.interval);
                this.interval = 0;
                return;
            }

            this.current = this.stack.shift();
        }

        // Run the current item
        if (this.current()) {
            // If true was returned then we eliminate the current item so the next tick we get a new one
            this.current = null;
        }
    }

} 