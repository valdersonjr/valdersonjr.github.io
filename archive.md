---
layout: page
title: Arquivo
---

<section>
  {% if site.posts[0] %}

    {% capture first_tag %}{{ site.posts[0].tag }}{% endcapture %}

    <h3> {{ first_tag }} </h3>

    {%for post in site.posts %}
      {% unless post.next %}
        <ul>
      {% else %}
        {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
        {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
        {% capture tag %}{{ post.tag }}{% endcapture %}
        {% capture ntag %}{{ post.next.tag }}{% endcapture %}
        {% if tag != ntag %}
          </ul>
          <h3>{{ post.tag }}</h3>
          <ul>
        {% endif %}
      {% endunless %}
        <li><time>{{ post.date | date:"%d/%m/%Y" }} - </time>
          <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
            {{ post.title }}
          </a>
        </li>
    {% endfor %}
    </ul>

  {% endif %}
</section>