# &lt;flipping-tile&gt;

A web component as a card/tile. 

## Attributes

### `flipped`

A boolean attribute. If flipped, the front face of the card is showing with an animation.

### `inactive`

A boolean attribute. If inactive, the card cannot be flipped.

### `hidden`

A boolean attribute. If hidden, the card cannot be flipped, nor does it show anything but a shell.

## Methods

### `isEqual()`

A method that will compare the argument with the current element for equality.

Parameters: other

Returns: Boolean value if the card is equal to the argument.

### `flipCard()`

When called, flipped attribute is set, and card will flip.

Parameters: none

Returns: none.

## Events

| Event Name | Fired When |
|------------|------------|
| `click`| Will flip the card.

## Styling with CSS

>`The card is styleable using the part "card"`
>```
>flipping-tile::part(card) {height: 100px;}
>```

>`The front side of card is styleable using the part "front"`
>```
>flipping-tile::part(front) {background-color: green;}
>```

>`The back side of card is styleable using the part "back"`
>```
>flipping-tile::part(back) {background-size: 70px;}
>```

## Example

### `Put an img inside the element will place the image in a slot element of the front side.`

```html
    <flipping-tile flipped>
        <img src="./example.png" alt="">
    </flipping-tile>
```