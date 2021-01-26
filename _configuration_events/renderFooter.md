---
event: render:footer
args: "(footer)"
---

`footer` is element of rendered footer.

Event is called after renderFooter function.

```js
...
setup: (picker) => {
  picker.on('render:footer', (day, date) => {
    // some action
  });
},
...
```