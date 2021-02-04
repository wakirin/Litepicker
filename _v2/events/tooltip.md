---
event: tooltip
args: (tooltip, day)
---

`tooltip` is element of tooltip.

`day` is element of hovered day. 

Event is called after `showTooltip` function.

```js
...
setup: (picker) => {
  picker.on('tooltip', (tooltip, day) => {
    // some action
  });
},
...
```