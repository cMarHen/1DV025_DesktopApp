# &lt;my-highscore-component&gt;

A web component as a highscore component. 

## Attributes

None.

## Methods

### `sortHighscore()`

Takes the data and sort the data with type.

Parameters: 

> data - Objects in an array.

> type - What type of sorting.

Returns: The sorted objects in an array.

### `updateHighscore()`

Reset de highscore data, and push the updated version.

Parameters: None.

Returns: None.

### `appendToDom()`

Creates a new li-element and append it accordingly.

Parameters: 

> obj - A object representing a score.

> type - What game to append.

Returns: None.


## Events

| Event Name | Fired When |
|------------|------------|
| `clicked`| When a tab is clicked.


## Example


```html
    <my-highscore-component></my-highscore-component>
```