---
event: button:cancel
args: ()
---

Event is called after click on button cancel (footer).

```js
...
setup: (picker) => {
  picker.on('button:cancel', () => {
    // some action
  });
},
...
```