# &lt;memory-area&gt;

A web component as a memory game board. The component is responsible for composing of the gameboard and the playablility. 

## Attributes

### `difficulty`

A boolean attribute. If hidden, 

- easy
- medium
- hard

## Methods

### `onFlippedEvent()`

Responsible for action when a card is flipped. 
Push a flipped card to an array, and when two cards are there, they are compared if equal.

Parameters: event - The event

Returns: none.

### `tileIsEqual()`

Compare equality for two arguments. If the same image and not exactly the same card, set cards to 'hidden'. If not, cards are flipping back to face down.

Send 'match'- or 'noMatch'-event after comparing.

Parameters: tile1, tile2 - Two cards.

Returns: none.

### `checkIfAllMatch()`

Check the gameboard if all cards has attribute 'hidden'.
Displays a play again-scene if all tiles are hidden.

Send 'all-matched'-event after comparing if all are hidden.

Parameters: none.

Returns: none.

### `createGrid()`

Creates a grid area for the cards.

Parameters: column - The amount of columns.
            row - The amount of rows.

Returns: none.

### `createTileArray()`

For each of the tiles wanted, a flipping-tile element is created, and append an img-element representing the front face to it.

Parameters: tiles - The amount of tiles wanted.

Returns: An array with HTMLElements.

### `createImageArray()`

For each pair, create two image urls.

Parameters: pairs - The amount of tiles / 2.

Returns: none.

### `randomIndexArray()`

Duplicate the indexes wanted and shuffles them.

Parameters: indexes - The amount of indexes wanted.

Returns: An array with random numbers.

## Events

| Event Name | Fired When |
|------------|------------|
| `flipping-tile:flipped`| A card is flipped.

## Example

### `Put an img inside the element will place the image in a slot element of the front side.`

```html
        <memory-area difficulty="medium"></memory-area>
```