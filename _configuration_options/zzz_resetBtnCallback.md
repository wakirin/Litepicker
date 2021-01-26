---
type: Boolean
default: false
deprecated: true
---

_useResetBtn must be at true._

_This function is call when the reset button is click._

_By default it will call the clearSelection method._

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