# &lt;memory-application&gt;

A web component as a memory game application.


## Methods

### `updateScoreMatch()`

When called, updates score with 10 and try-counter with 1.

Parameters: none.

Returns: none.

### `updateScoreNomatch()`

When called, updates try-counter with 1.

Parameters: none.

Returns: none.


## Events

| Event Name | Fired When |
|------------|------------|
| `levelchoice:click`| A difficulty is choosed.
| `memoryArea:match`| Two cards are matched.
| `memoryArea:noMatch`| Cards are not matched.
| `memoryArea:all-matched`| Gameboard is complete.
