---
event: hide
args: ()
---

Event is called after hide.

```js
...
setup: (picker) => {
  picker.on('hide', () => {
    // some action
  });
},
...
```