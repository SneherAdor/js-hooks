/**
 * The WordPress filters, actions system in JavaScript.
 *
 * A versatile JavaScript hooks system inspired by WordPress, designed to add and remove actions and filters effortlessly. 
 * This library empowers developers to hook into core functions and modify their behavior, facilitating the creation of extensible JavaScript applications. 
 * Ideal for developing plugins or modules that can be seamlessly integrated or removed, enhancing the flexibility and maintainability of your codebase.
 *
 * Features:
 * - addAction(tag, callback, priority): Register a new action for a specific tag.
 * - addFilter(tag, callback, priority): Register a new filter for a specific tag.
 * - removeAction(tag, callback): Remove a previously registered action.
 * - removeFilter(tag, callback): Remove a previously registered filter.
 * - doAction(tag, options): Execute all actions associated with a specific tag.
 * - applyFilters(tag, value, options): Apply all filters associated with a specific tag to a value.
 * - hasAction(tag): Check if any actions are registered for a specific tag.
 * - hasFilter(tag): Check if any filters are registered for a specific tag.
 *
 */


/**
 * Hooks class
 *
 * This class contains methods to add, remove, and execute actions and filters.
 */
class Hooks {
    constructor() {
        this.actions = {};
        this.filters = {};
    }

    /**
     * Add a new action callback.
     *
     * @param {string} tag - The tag specified by do_action().
     * @param {function} callback - The callback function to call when do_action() is called.
     * @param {number} [priority=10] - The order in which to call the callbacks.
     */
    addAction(tag, callback, priority = 10) {
        this.actions[tag] = this.actions[tag] || [];
        this.actions[tag].push({ priority, callback });
    }

    /**
     * Add a new filter callback.
     *
     * @param {string} tag - The tag specified by apply_filters().
     * @param {function} callback - The callback function to call when apply_filters() is called.
     * @param {number} [priority=10] - Priority of the filter to apply.
     */
    addFilter(tag, callback, priority = 10) {
        this.filters[tag] = this.filters[tag] || [];
        this.filters[tag].push({ priority, callback });
    }

    /**
     * Remove an action callback.
     *
     * @param {string} tag - The tag specified by do_action().
     * @param {function} callback - The callback function to remove.
     */
    removeAction(tag, callback) {
        if (!this.actions[tag]) return;
        this.actions[tag] = this.actions[tag].filter(action => action.callback !== callback);
    }

    /**
     * Remove a filter callback.
     *
     * @param {string} tag - The tag specified by apply_filters().
     * @param {function} callback - The callback function to remove.
     */
    removeFilter(tag, callback) {
        if (!this.filters[tag]) return;
        this.filters[tag] = this.filters[tag].filter(filter => filter.callback !== callback);
    }

    /**
     * Execute all action callbacks for a specific tag.
     *
     * @param {string} tag - A registered tag in this.actions.
     * @param {object} [options] - Optional JavaScript object to pass to the callbacks.
     */
    doAction(tag, options) {
        if (!this.actions[tag]) return;
        const actions = this._getSortedCallbacks(this.actions[tag]);
        actions.forEach(callback => callback(options));
    }

    /**
     * Apply all filter callbacks for a specific tag.
     *
     * @param {string} tag - A registered tag in this.filters.
     * @param {*} value - The value to be filtered.
     * @param {object} [options] - Optional JavaScript object to pass to the callbacks.
     * @returns {*} - The filtered value.
     */
    applyFilters(tag, value, options) {
        if (!this.filters[tag]) return value;
        const filters = this._getSortedCallbacks(this.filters[tag]);
        filters.forEach(callback => {
            value = callback(value, options);
        });
        return value;
    }

    /**
     * Check if any actions are registered for a specific tag.
     *
     * @param {string} tag - The tag specified by do_action().
     * @returns {boolean} - True if there are any actions registered for the tag, false otherwise.
     */
    hasAction(tag) {
        return !!this.actions[tag] && this.actions[tag].length > 0;
    }

    /**
     * Check if any filters are registered for a specific tag.
     *
     * @param {string} tag - The tag specified by apply_filters().
     * @returns {boolean} - True if there are any filters registered for the tag, false otherwise.
     */
    hasFilter(tag) {
        return !!this.filters[tag] && this.filters[tag].length > 0;
    }

    /**
     * Get sorted callbacks by priority.
     *
     * @param {Array} hooks - Array of hooks with priority and callback.
     * @returns {Array} - Sorted array of callbacks.
     * @private
     */
    _getSortedCallbacks(hooks) {
        return hooks
            .sort((a, b) => a.priority - b.priority)
            .map(hook => hook.callback);
    }
}

// Instantiate the Hooks class
const hooks = new Hooks();

// Helper functions for ease of use
const addAction = (tag, callback, priority) => hooks.addAction(tag, callback, priority);
const addFilter = (tag, callback, priority) => hooks.addFilter(tag, callback, priority);
const removeAction = (tag, callback) => hooks.removeAction(tag, callback);
const removeFilter = (tag, callback) => hooks.removeFilter(tag, callback);
const doAction = (tag, options) => hooks.doAction(tag, options);
const applyFilters = (tag, value, options) => hooks.applyFilters(tag, value, options);
const hasAction = (tag) => hooks.hasAction(tag);
const hasFilter = (tag) => hooks.hasFilter(tag);

// Export for Node.js and global assignment for browser
if (typeof window !== 'undefined') {
    window.hooks = hooks;
    window.addAction = addAction;
    window.addFilter = addFilter;
    window.removeAction = removeAction;
    window.removeFilter = removeFilter;
    window.doAction = doAction;
    window.applyFilters = applyFilters;
    window.hasAction = hasAction;
    window.hasFilter = hasFilter;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        Hooks,
        addAction,
        addFilter,
        removeAction,
        removeFilter,
        doAction,
        applyFilters,
        hasAction,
        hasFilter
    };
}
