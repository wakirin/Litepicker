Keyboard navigation plugin
=========

Usage:
```
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/js/main.js"></script>

// include plugin after Litepicker

<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/js/plugins/keyboardnav.js"></script>
```

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker first.
```
import Litepicker from 'litepicker';
import 'litepicker/dist/js/plugins/keyboardnav';
```

Now you can create Litepicker instance with plugin:
```
<script>
const picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  plugins: ['keyboardnav']
});
</script>
```