var backgroundTasks = (function () {
    /**
    * Creates a new background tasks queue.  Used for long running, asynchronous tasks.
    */
    function backgroundTasks(rate) {
        this.stack = [];
        /**
        * This is the interval value.  0 to indicate unset, and other value to
        * indicate an interval is running.
        */
        this.interval = 0;
        /**
        * The currently processing background task.
        */
        this.current = null;
        this.rate = rate;
    }
    /**
    * Used to add tasks to the queue.
    * @param func {BackgroundTask} The background task to add to the task stack.  See interface BackgroundTask for details.
    */
    backgroundTasks.prototype.push = function (func) {
        var _this = this;
        // Add to the task stack
        this.stack.push(func);

        // Start the background processing
        if (!this.interval) {
            this.interval = setInterval(function () {
                _this.next();
            }, this.rate);
        }
    };

    Object.defineProperty(backgroundTasks.prototype, "length", {
        /**
        * Returns the number of items in the task queue.
        */
        get: function () {
            if (this.current) {
                return this.stack.length + 1;
            } else {
                return this.stack.length;
            }
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Internal method that processes the next item in the task stack.
    */
    backgroundTasks.prototype.next = function () {
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
    };
    return backgroundTasks;
})();
//# sourceMappingURL=background-tasks.js.map
