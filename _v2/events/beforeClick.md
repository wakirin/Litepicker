---
event: before:click
args: (target)
---

`target` is clicked element.

Event is called before click on calendar elements.
Note: «Calendar elements» are children of `.litepicker` element.

```js
...
setup: (picker) => {
  picker.on('before:click', (target) => {
    // some action
  });
},
...
```

You can prevent default behavior with `preventClick`.

```js
...
setup: (picker) => {
  picker.on('before:click', (target) => {
    picker.preventClick = true;
    // some action
  });
},
...
```