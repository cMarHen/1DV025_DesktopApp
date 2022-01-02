# &lt;my-custom-timer&gt;

A web component as a timer. Using its methods can start and stop the clock. 

## Methods

### `startTimer()`

Will start the timer.

Parameters: 

            intervalID - How fast it will tick 

            decimals - How many decimals that should be shown.

Returns: None.

### `stopTimer()`

When called, the timer is stopped. Dispatches event 'timeIsUp' when called with the total time.

Parameters: None.

Returns: The total time.


## Styling with CSS

>`The timer is styleable using the part "tickingUp"`
>```
>my-custom-timer::part(tickingUp) {font-size: 1.4rem;}
>```

## Example


```html
    <my-custom-timer></my-custom-timer>
```