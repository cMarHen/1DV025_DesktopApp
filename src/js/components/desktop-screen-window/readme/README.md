# &lt;desktop-screen-window&gt;

A web component as a desktop sub-window. 

## Attributes

### `zindex`

The z-index to be used for the component.

## Methods

None.


## Events

| Event Name | Fired When |
|------------|------------|
| `closeWindow`| When a window wants to be closed.
| `require-fullscreen`| When a window wants to be fullscreen.


## Slots

| Slot Name |
|------------|
| `app`| 


## Example


```html
    <desktop-screen-window zindex="2">
      <shooter-area-main slot="app"></shooter-area-main>
    </desktop-screen-window>
```