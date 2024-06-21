
# JavaScript Hooks System

A versatile JavaScript hooks system inspired by WordPress, designed to add and remove actions and filters effortlessly. This library empowers developers to hook into core functions and modify their behavior, facilitating the creation of extensible JavaScript applications. Ideal for developing plugins or modules that can be seamlessly integrated or removed, enhancing the flexibility and maintainability of your codebase.

## Features
- **addAction(tag, callback, priority):** Register a new action for a specific tag.
- **addFilter(tag, callback, priority):** Register a new filter for a specific tag.
- **removeAction(tag, callback):** Remove a previously registered action.
- **removeFilter(tag, callback):** Remove a previously registered filter.
- **doAction(tag, options):** Execute all actions associated with a specific tag.
- **applyFilters(tag, value, options):** Apply all filters associated with a specific tag to a value.
- **hasAction(tag):** Check if any actions are registered for a specific tag.
- **hasFilter(tag):** Check if any filters are registered for a specific tag.

## Installation

You can include this library directly in your project by downloading the source code from this repository and adding it to your project.

```html
<script src="path/to/hooks.js"></script>
```

## Usage

Below is a basic example demonstrating how to use this library.

### Example

```javascript

// Add an action
addAction('init', () => {
    console.log('Initialization action called');
});

// Add a filter
addFilter('content', (content) => {
    return content.toUpperCase();
});

// Check if an action is registered
if (hasAction('init')) {
    console.log('Init action is registered');
}

// Check if a filter is registered
if (hasFilter('content')) {
    console.log('Content filter is registered');
}

// Execute an action
doAction('init');

// Apply a filter
const filteredContent = applyFilters('content', 'Hello World');
console.log(filteredContent);  // Outputs: HELLO WORLD

// Remove the action
removeAction('init', callback);

// Remove the filter
removeFilter('content', callback);
```

## API Documentation

### `addAction(tag, callback, priority = 10)`
Registers a new action callback for a specific tag.

- **tag**: The tag specified by `doAction`.
- **callback**: The callback function to call when `doAction` is executed.
- **priority**: The order in which to call the callbacks. Lower numbers correspond to earlier execution. Default is 10.

### `addFilter(tag, callback, priority = 10)`
Registers a new filter callback for a specific tag.

- **tag**: The tag specified by `applyFilters`.
- **callback**: The callback function to call when `applyFilters` is executed.
- **priority**: The order in which to call the callbacks. Lower numbers correspond to earlier execution. Default is 10.

### `removeAction(tag, callback)`
Removes a previously registered action callback for a specific tag.

- **tag**: The tag specified by `doAction`.
- **callback**: The callback function to remove.

### `removeFilter(tag, callback)`
Removes a previously registered filter callback for a specific tag.

- **tag**: The tag specified by `applyFilters`.
- **callback**: The callback function to remove.

### `doAction(tag, options)`
Executes all action callbacks registered for a specific tag.

- **tag**: The tag of the registered actions to execute.
- **options**: Optional JavaScript object to pass to the callbacks.

### `applyFilters(tag, value, options)`
Applies all filter callbacks registered for a specific tag to a value.

- **tag**: The tag of the registered filters to apply.
- **value**: The value to be filtered.
- **options**: Optional JavaScript object to pass to the callbacks.

### `hasAction(tag)`
Checks if any actions are registered for a specific tag.

- **tag**: The tag to check for registered actions.
- **returns**: `true` if there are any actions registered for the tag, `false` otherwise.

### `hasFilter(tag)`
Checks if any filters are registered for a specific tag.

- **tag**: The tag to check for registered filters.
- **returns**: `true` if there are any filters registered for the tag, `false` otherwise.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

Inspired by the WordPress hooks system.

---

Feel free to open issues or pull requests if you have any questions or suggestions!