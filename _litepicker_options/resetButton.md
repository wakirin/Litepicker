---
type: Boolean | Function
default:  null
since: 2.0.0
---

Adds a reset button to clear the current selection.

```js
...
resetButton: true,
...
```

OR

```js
...
// Do not need call clear selection inside this function.
// function should return HTML element
resetButton: () => {
   let btn = document.createElement('button');
   btn.innerText = 'Clear';
   btn.addEventListener('click', (evt) => {
     evt.preventDefault();

     // some custom action
   });

   return btn;
},
...
```