---
layout: default
title: Plugins
nav_order: 5
permalink: /docs/plugins
---

# Plugins
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# Keyboard navigation plugin

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

# Mobile friendly plugin

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

## Plugin has events:
{: .no_toc }

### mobilefriendly.before:show <sup>2.0.0+</sup>
{: .no_toc }

Arguments: `(el)`

`el` is triggered element. 

Event is called before show in mobile view.

```js
...
setup: (picker) => {
  picker.on('mobilefriendly.before:show', (el) => {
    // some action
  });
},
...
```

### mobilefriendly.show <sup>2.0.0+</sup>
{: .no_toc }

Arguments: `(el)`

`el` is triggered element. 

Event is called after show in mobile view.

```js
...
setup: (picker) => {
  picker.on('mobilefriendly.show', (el) => {
    // some action
  });
},
...
```

# Predefined ranges plugin

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