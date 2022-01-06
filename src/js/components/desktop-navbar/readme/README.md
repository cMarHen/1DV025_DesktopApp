# &lt;desktop-navbar&gt;

A web component as desktop dock - a navigation bar. 

## Attributes

None.

## Methods

None.

## Events

| Event Name | Fired When |
|------------|------------|
| `click`| When an icon is pressed.
| `keydown`| When a key is pressed.

## Slots

| Slot Name |
|------------|
| `icon1`|
| `icon2`|
| `icon3`|
| `icon4`|
| `icon5`|
| `icon6`|

## Example

```html
<desktop-navbar>
  <div id="shooter-area-main" class="icon" slot="icon1" tabindex="0" title="Astroid Shooter"></div>
</desktop-navbar>
```