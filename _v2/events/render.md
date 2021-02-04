---
event: render
args: "(ui)"
---

`ui` is root element of picker. 

Event is called after render function.

```js
...
setup: (picker) => {
  picker.on('render', (ui) => {
    // some action
  });
},
...
```