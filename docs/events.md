---
layout: default
title: Events
nav_order: 3
permalink: /docs/events
---

# Events
{: .no_toc }

---

Since v2 all events work with EventEmitter.

Example initialize:

```js

...
setup: (picker) => {
   picker.on('show', () => {
     // some action after show
   });

   picker.on('render', (ui) => {
     // some action after render
     // ui is root element of picker
   });
},
...
```

# Event list
{: .no_toc }

{% for opt in site.configuration_events %}
{% if opt.deprecated %}
## <span class="label label-red">Deprecated</span> {{ opt.event }} 
{% elsif opt.since %}
## {{ opt.event }} <sup>{{ opt.since }}+</sup>
{% else %}
## {{ opt.event }}
{% endif %}

Arguments: `{{ opt.args }}`

{{ opt.content | markdownify }}

{% endfor %}