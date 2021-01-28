---
event: show
args: (el)
---

`el` is triggered element. 

Event is called after show.

```js
...
setup: (picker) => {
  picker.on('show', (el) => {
    // some action
  });
},
...
```