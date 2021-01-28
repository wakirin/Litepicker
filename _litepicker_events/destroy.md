---
event: destroy
args: ()
---

Event is called after destroy.

```js
...
setup: (picker) => {
  picker.on('destroy', (tooltip, day) => {
    // some action
  });
},
...
```