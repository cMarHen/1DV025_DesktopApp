# &lt;my-custom-button&gt;

A web component as a clickable button. 

## Attributes

### `inactive`

A boolean attribute. If inactive, button cant be clicked.

## Events

| Event Name | Fired When |
|------------|------------|
| `clicked`| When clicking button, detail with slotted content is sent.

## Styling with CSS

>`The button text is styleable using the part "buttonText"`
>```
>::part(buttonText) {color: pink;}
>```

>`The button body is styleable using the part "buttonArea"`
>```
>::part(buttonArea) {background: red;}
>```

## Example

### `Put an img inside the element will place the image in a slot element of the front side.`

```html
    <my-custom-button>PLAY</my-custom-button>
```