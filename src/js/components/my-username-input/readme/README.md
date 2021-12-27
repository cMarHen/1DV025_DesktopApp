# &lt;my-username-input&gt;

A web component as a card/tile. 

## Attributes

### `type`

Determine which prefix to be used when saving to local storage.

## Methods

### `setUsername()`

Will set the username to local storage. Dispatch 'username-set' if type is set.

Parameters: event

Returns: None.

## Events

| Event Name | Fired When |
|------------|------------|
| `cclicked`| When button is clicked.

## Example

### `Determine what prefix should be used in local storage.`

```html
    <my-username-input type="chatApplication"></my-username-input>
```