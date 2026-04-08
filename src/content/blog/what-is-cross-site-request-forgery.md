---
title: What is Cross Site Request Forgery (CSRF)?
description: 'An in-depth look at Cross Site Request Forgery (CSRF) attacks and how to prevent them.'
tags: [security, csrf, web development, javascript]
pubDate: 'Apr 5 2026'
---

# What is Cross Site Request Forgery (CSRF)?
Cross Site Request Forgery, as implied within its name, is a known exploit of the web. So what is it? It's quite interesting how all of this works, say you are logged in to your bank account, and you visit some other website, on that website there is a form that gets submitted on load to your bank's website. Without CSRF protection this form would be executed and money will be transferred from your account to the attacker's account.

```html
<form id="csrf-form" action="https://my-bank.example.org/transfer" method="POST">
  <input type="hidden" name="recipient" value="attacker" />
  <input type="hidden" name="amount" value="1000" />
</form>
<script>document.getElementById('csrf-form').submit();</script>
```

If the website uses get request to carry out the actions, then the attacker could just use a link to carry out the attack.

```html
<img
  src="https://my-bank.example.org/transfer?recipient=attacker&amount=1000" />
```

## History of CSRF

While doing research for this article, I came across quite a few interesting tidbits. Back in the Windows XP days, Internet Explorer did not share session cookies between separate browser processes, this means if you opened a new IE window from the desktop, you would lose your session. This inadvertently protected users from CSRF, but it was not an ideal experience. Years later, in 2016, Google engineers proposed the `SameSite` cookie attribute, which gave developers explicit control over whether cookies are sent with cross-site requests. It was eventually adopted by all major browsers, with Chrome enforcing `SameSite=Lax` as the default starting in 2020.

Another interesting bit is the discovery of CSRF. Peter Watkins coined the term Cross Site Request Forgery back in June 2001. Early large-scale exploits were carried out on MySpace, Netflix and YouTube.


## Defense Against CSRF

1. CSRF Token: If you ever learned any backend frameworks like Laravel, Django or Rails you might have come across code like this
Laravel
```php
<form method="POST" action="/profile">
    @csrf

    <!-- Equivalent to... -->
    <input type="hidden" name="_token" value="{{ csrf_token() }}" />
</form>
```

Or 
Django
```html
<form method="post">{% csrf_token %}
```

Or 
Rails
```html
<head>
  <%= csrf_meta_tags %>
</head>
```
The first primary defense is to use CSRF tokens, embedded into the page, which get validated on form submit. Any unsafe form request will be blocked if the CSRF token is missing or invalid, and it changes on every page refresh. This is the most common method if you are issuing state-changing actions via forms.

2. Nowadays we have RESTful APIs where our backend and frontend are separate. In that case we could leverage the Fetch Metadata `Sec-Fetch-Site` header. The server can read this and determine if the request is same-origin, same-site, cross-origin or initiated directly by the user. The server then can use this information to allow cross-origin requests or block them.

3. Third is to ensure when we are designing our backend that state-changing requests don't use safe HTTP methods. Safe methods as defined by the HTTP specification are:

    * GET
    * HEAD
    * OPTIONS
    * TRACE

    These methods should only be used for read operations. Additionally, ensure that state-changing requests are not [simple requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS#simple_requests) — for example, by requiring a `Content-Type: application/json` header or a custom header. This ensures the browser sends a CORS preflight request, which provides an extra layer of protection against cross-origin attacks.

We have come a long way, many of us hardly think about CSRF due to the advancement of browsers and awareness and adoption by popular web frameworks. Still with the rise of vibe coding it's more important than ever to know about CSRF, so when our AI assistant makes a mistake we could guide it or get our hands dirty and do it by ourselves.

## References

- [CSRF - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF)
- [Simon Willison - Cross-Domain Ajax](https://simonwillison.net/2005/May/6/bad/)
- [Laravel CSRF Protection](https://laravel.com/docs/13.x/csrf#main-content)
- [The Historical Evolution of Cross-Site Request Forgery](https://www.rajatswarup.com/blog/2023/03/08/the-historical-evolution-of-cross-site-request-forgery/)
- [Preventing CSRF in Go](https://www.alexedwards.net/blog/preventing-csrf-in-go)
