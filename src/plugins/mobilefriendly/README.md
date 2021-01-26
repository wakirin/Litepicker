Mobile friendly plugin
=========

Usage:
```
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>

// include plugin after Litepicker

<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/plugins/mobilefriendly.js"></script>
```

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker first.
```
import Litepicker from 'litepicker';
import 'litepicker/dist/js/plugins/mobilefriendly';
```

Now you can create Litepicker instance with plugin:
```
<script>
const picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  plugins: ['mobilefriendly']
});
</script>
```