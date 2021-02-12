---
event: error:date
args: ()
---

Event is called on wrong selection with `setDate` method.

```js
...
setup: (picker) => {
  picker.on('error:date', () => {
    // some action
  });
},
...
```