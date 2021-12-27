# &lt;shooter-score-counter&gt;

A web component as a score counter. 

## Attributes

### `value`

The number to update score with.


## Methods

### `flashScore`

Will update the content with the new value, and set a flashing animation to it each time.

Parameters: newValue - The new score value.

Returns: None.


## Styling with CSS

>`The element is styleable using the part "counterText"`
>```
>::part(counterText) {height: 100px;}
>```

## Example

### `Set the new value as an attribute.`

```html
    <shooter-score-counter value="10"></shooter-score-counter>
```