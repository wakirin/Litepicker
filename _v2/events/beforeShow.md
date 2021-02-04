---
event: before:show
args: (el)
---

`el` is triggered element. 

Event is called before show.

```js
...
setup: (picker) => {
  picker.on('before:show', (el) => {
    // some action
  });
},
...
```