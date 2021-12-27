# &lt;flipping-tile&gt;

A web component as a game area with a shooter cannon and astroids flying down. 

## Methods

### `startGame()`

Will start the timer, and start generating new astroids using the argument as interval.

Parameters: speed - Number in ms. The start interval value for astroids to be generated.

Returns: None.

### `createAstroid()`

When called, an astroid are created, using the argument as duration speed for animation.

Parameters: speed - The animation duration to be used.

Returns: none.

## Events

| Event Name | Fired When |
|------------|------------|
| `astroid-shot`| An astroid is shot.
| `animationend`| An animation reach end of animation without beeing shot.
| `mousemove`| When user is aiming the cannon.

## Example

```html
    <shooter-astroid-field></shooter-astroid-field>
```