Predefined ranges plugin
=========

Usage:
```
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/js/main.js"></script>

// include plugin after Litepicker

<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/js/plugins/ranges.js"></script>
```

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker first.
```
import Litepicker from 'litepicker';
import 'litepicker/dist/js/plugins/ranges';
```

Now you can create Litepicker instance with plugin:
```
<script>
const picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  plugins: ['ranges']
});
</script>
```

Also you can define your own ranges:
```
<script>
const picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  plugins: ['ranges'],
  ranges: {
    position: 'left',
    customRanges: {
      'New range': [new Date('2020-11-19'), new Date()] // first start date then end date.
    }
  }
});
</script>
```