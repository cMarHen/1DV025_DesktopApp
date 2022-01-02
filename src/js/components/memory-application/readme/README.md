# &lt;memory-application&gt;

A web component as a memory game application.


## Methods

### `setDifficulty()`

Display area for setting difficulty.

Parameters: none.

Returns: none.

### `startGame()`

Start game if there is a username.

Parameters: event - The event.

Returns: none.

### `updateScoreMatch()`

When called, updates score with 10 and try-counter with 1.

Parameters: none.

Returns: none.

### `updateScoreNomatch()`

When called, updates try-counter with 1.

Parameters: none.

Returns: none.

### `setToStorage()`

Store highscore data in local storage.

Parameters: none.

Returns: none.


## Events

| Event Name | Fired When |
|------------|------------|
| `username-set`| A username is choosed.
| `levelchoice:click`| A difficulty is choosed.
| `memoryArea:match`| Two cards are matched.
| `memoryArea:noMatch`| Cards are not matched.
| `memoryArea:all-matched`| Gameboard is complete.
