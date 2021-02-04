---
layout: default
title: Keyboard navigation plugin
parent: Plugins
---

# Keyboard navigation plugin

Adds keyboard navigation.  
Supports Tab, Shift+Tab, Arrow keys.

Litepicker version 2.0.0 or higher is required.

{% capture keyboardnav_video %}
<video class="demo-video" autoplay="autoplay" muted loop preload="metadata">
    <source src="{{ '/assets/video/keyboardnav.mp4' | relative_url }}" type="video/mp4">
</video>
{% endcapture %}

{% include collapse.html title="Video" content=keyboardnav_video %}


### Installation
{: .no_toc }

```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>
// include plugin after Litepicker
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/plugins/keyboardnav.js"></script>
```

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker first.

```ts
import Litepicker from 'litepicker';
import 'litepicker/dist/plugins/keyboardnav';
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

{% capture keyboardnav_content %}
1. Click on first input.
2. Press `Tab` key.

<div style="display:flex">
  <input placeholder="Some previous element" class="form-control" style="width: 250px;margin-right: 15px;" />
  <input id="input-keyboardnav" class="form-control" style="width: 250px" readonly/>
</div>
<div class="demo-wrapper" data-cfg="keyboardnav"></div>

---

Code:

```js
new Litepicker({
  element: document.getElementById('datepicker'),
  plugins: ['keyboardnav']
})
```
{% endcapture %}

{% include collapse.html title="Demo" content=keyboardnav_content %}