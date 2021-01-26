---
event: before:render
args: "(ui)"
---

`ui` is root element of picker. 

Event is called before render function.

```js
...
setup: (picker) => {
  picker.on('before:render', (ui) => {
    // some action
  });
},
...
```