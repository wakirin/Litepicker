---
layout: default
title: Methods
nav_order: 4
permalink: /docs/methods
---

# Methods
{: .no_toc }

---

{% for opt in site.configuration_methods %}
{% assign optName = opt.path | replace: '_configuration_methods/', '' | replace: '.md', '' | replace: 'zzz_', '' %}
{% if opt.deprecated %}
## <span class="label label-red">Deprecated</span> {{ optName }} 
{% elsif opt.since %}
## {{ optName }} <sup>{{ opt.since }}+</sup>
{% else %}
## {{ optName }}
{% endif %}

Arguments: `{{ opt.args }}`

Return: `{{ opt.return  }}`

{{ opt.content | markdownify }}

{% endfor %}