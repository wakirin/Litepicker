---
type: Boolean
default: false
deprecated: true
---

_Adds a reset button to clear the current selection._

**Reason: Since v2.0.0 added new option `resetButton`.**

### Replacement:
```js
...
resetButton: true,
...
```

OR 

```js
...
resetButton: (picker) => {
   let b = document.createElement('button');
   b.innerText = 'Clear';
   b.addEventListener('click', (evt) => {
     evt.preventDefault();

     // some custom action
   });

   return b;
},
...
```