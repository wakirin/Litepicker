---
event: clear:selection
args: ()
---

Event is called clear selection.

```js
...
setup: (picker) => {
  picker.on('clear:selection', () => {
    // some action
  });
},
...
```