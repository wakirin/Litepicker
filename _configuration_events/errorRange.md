---
event: error:range
args: ()
---

Event is called on wrong selection range (when disallowLockDaysInRange is enabled).

```js
...
setup: (picker) => {
  picker.on('error:range', () => {
    // some action
  });
},
...
```