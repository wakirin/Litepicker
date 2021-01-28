---
layout: default
title: Plugins
nav_order: 5
permalink: /docs/plugins
---

# Plugins
{: .no_toc }

---

## Keyboard navigation plugin

```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>
// include plugin after Litepicker
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/plugins/keyboardnav.js"></script>
```

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker first.

```ts
import Litepicker from 'litepicker';
import 'litepicker/dist/js/plugins/keyboardnav';
```

Now you can create Litepicker instance with plugin:

```html
<script>
const picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  plugins: ['keyboardnav']
});
</script>
```

## Mobile friendly plugin

```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>
// include plugin after Litepicker
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/plugins/mobilefriendly.js"></script>
```

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker first.

```ts
import Litepicker from 'litepicker';
import 'litepicker/dist/js/plugins/mobilefriendly';
```

Now you can create Litepicker instance with plugin:

```html
<script>
const picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  plugins: ['mobilefriendly']
});
</script>
```

## Predefined ranges plugin

```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>
// include plugin after Litepicker
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/plugins/ranges.js"></script>
```

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker first.

```ts
import Litepicker from 'litepicker';
import 'litepicker/dist/js/plugins/ranges';
```

Now you can create Litepicker instance with plugin:

```html
<script>
const picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  plugins: ['ranges']
});
</script>
```

You can define your own ranges:

```html
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