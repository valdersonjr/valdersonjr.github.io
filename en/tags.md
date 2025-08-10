---
layout: page
permalink: /en/tags/
lang: en
translation_key: tags
---

<section>
{% assign tags_sorted = site.tags | sort %}
{% for tag in tags_sorted %}
    {% capture tag_name %}{{ tag | first }}{% endcapture %}

    <h3 class="tag-head"><small>{{ tag_name }}</small></h3>
    <a name="{{ tag_name | slugize }}"></a>

    {% assign posts_for_tag = site.tags[tag_name] | where: 'lang', 'en' %}
    {% for post in posts_for_tag %}
      <ul>
        <li><time>{{ post.date | date:"%d/%m/%Y" }} - </time>
          <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
            {{ post.title }}
          </a>
        </li>
      </ul>
    {% endfor %}
    <br>
{% endfor %}
</section>