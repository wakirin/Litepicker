---
layout: default
nav: Multiselect plugin
title: "Multiselect plugin"
description: "Adds multiple selection."
parent: Plugins
---

# Multiselect plugin

Adds multiple selection.

Litepicker version 2.0.2 or higher is required.

{% capture multiselect_video %}
<video class="demo-video" autoplay="autoplay" muted loop preload="metadata">
    <source src="{{ '/assets/video/multiselect.mp4' | relative_url }}" type="video/mp4">
</video>
{% endcapture %}

{% include collapse.html title="Video" content=multiselect_video %}

### Installation
{: .no_toc }

```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>
// include plugin after Litepicker
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/plugins/multiselect.js"></script>
```

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker first.

```ts
import Litepicker from 'litepicker';
import 'litepicker/dist/plugins/multiselect';
```

Now you can create Litepicker instance with plugin:

```html
<script>
const picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  plugins: ['multiselect']
});
</script>
```

# Options

### max

Type: `Number`

Default: `null`

Optional. Limits the maximum number of days selected.

Example: 

```js
new Litepicker({
  element: document.getElementById('datepicker'),
  plugins: ['multiselect']
  multiselect: {
    max: 5,
  },
})
```

# Events

### multiselect.select

Arguments: `(date)`

`date` is DateTime object. 

Event is called after select day.

```js
...
setup: (picker) => {
  picker.on('multiselect.select', (date) => {
    // some action
  });
},
...
```

### multiselect.deselect

Arguments: `(date)`

`date` is DateTime object. 

Event is called after deselect day.

```js
...
setup: (picker) => {
  picker.on('multiselect.deselect', (date) => {
    // some action
  });
},
...
```

# Methods

### clearMultipleDates

Arguments: `()`

Return: `void`

Clear selections.


## getMultipleDates

Arguments: `()`

Return: `DateTime[]`

Return selected days as DateTime Objects.

## multipleDatesToString


Arguments: `(format, delimiter)`

Return: `String`

`format` is optional, default is `YYYY-MM-DD`. Allowed formats see in `format` option of Litepicker.
`delimiter` is optinal, default is `,`.

Return selected days as string.

{% capture multiselect_content %}
<div style="display:flex">
  <input id="input-multiselect" class="form-control" style="width: 250px" readonly/>
</div>
<div class="demo-wrapper" data-cfg="multiselect"></div>

---

Code:

```js
new Litepicker({
  element: document.getElementById('datepicker'),
  plugins: ['multiselect']
})
```
{% endcapture %}

{% include collapse.html title="Demo" content=multiselect_content %}