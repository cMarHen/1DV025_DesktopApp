# &lt;desktop-screen&gt;

Main component for a desktop application. 

## Attributes

None.

## Methods

### `importAndCreateElement()`

Import the wanted element if needed, then creates it.

Parameters: id - The name of the component to create.

Returns: - The created HTMLElement as a promise.

### `windowDragStart()`

Handle dragstart event.

Parameters: event - The event.

Returns: None.

### `windowDragOver()`

Handle dragover event, used to drag a sub-window around.

Parameters: event - The event.

Returns: None.


## Events

| Event Name | Fired When |
|------------|------------|
| `icon-request`| When the user clicks an icon.
| `require-focus`| When a window is clicked.
| `closeWindow`| When window wants to be removed.
| `dragstart`| When a window header is clicked.
| `dragend`| When dragging is released.
| `highscore-update`| When highscore is updated.
| windowDragStart::`dragover`| When a window header is dragged.


## Example


```html
    <desktop-screen></desktop-screen>
```