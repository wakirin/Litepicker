---
layout: default
title: Options
nav_order: 2
permalink: /docs/options
---

# Options
{: .no_toc }

---

{% for opt in site.configuration_options %}
{% assign optName = opt.path | replace: '_configuration_options/', '' | replace: '.md', '' | replace: 'zzz_', '' %}
{% if opt.deprecated %}
## <span class="label label-red">Deprecated</span> {{ optName }} 
{% elsif opt.since %}
## {{ optName }} <sup>{{ opt.since }}+</sup>
{% else %}
## {{ optName }}
{% endif %}

Type: `{{ opt.type }}`

Default: `{{ opt.default | jsonify }}`

{{ opt.content | markdownify }}

{% endfor %}