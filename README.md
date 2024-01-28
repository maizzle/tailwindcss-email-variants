<div align="center">
  <img src="./.github/tailwindcss-mark.svg" alt="Tailwind CSS" width="108" height="66">
  <h1>Tailwind CSS Email Variants</h1>

  [![Build][github-ci-shield]][github-ci]
  [![License][license-shield]][license]
</div>

A Tailwind CSS plugin that provides variants for email client targeting hacks used in HTML emails.

All variants are based on targeting hacks from [howtotarget.email](https://howtotarget.email)

## Installation

Install the plugin from npm:

```sh
npm install -D tailwindcss-email-variants
```

Then add the plugin to your `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    require('tailwindcss-email-variants'),
  ],
}
```

## Usage

Use the available variants to generate utilities that target specific email clients.

### Gmail

Use the `gmail` variant to target Gmail's webmail:

```html
<div class="gmail:hidden">...</div>
```

Result:

```css
u + .body .gmail\:hidden {
  display: none;
}
```

### Gmail (Android)

Use the `gmail-android` variant to target Gmail on Android devices:

```html
<div class="gmail-android:hidden">...</div>
```

Result:

```css
div > u + .body .gmail-android\:hidden {
  display: none;
}
```

### Apple Mail (10+)

Use the `apple-mail` variant to target Apple Mail 10 and up:

```html
<div class="apple-mail:hidden">...</div>
```

Result:

```css
.Singleton .apple-mail\:hidden {
  display: none;
}
```

### iOS Mail (10+)

Use the `ios` variant to target iOS Mail 10 and up:

```html
<div class="ios:hidden">...</div>
```

Result:

```css
@supports (-webkit-overflow-scrolling:touch) and (color:#ffff) {
  .ios\:hidden {
    display: none;
  }
}
```

### iOS Mail (15)

Use the `ios-15` variant to target iOS Mail 15 specifically:

```html
<div class="ios-15:hidden">...</div>
```

Result:

```css
@supports (-webkit-overflow-scrolling:touch) and (aspect-ratio: 1 / 1) {
  .ios-15\:hidden {
    display: none;
  }
}
```

### Outlook.com dark mode

Change `color` and `background-color` of elements in [Outlook.com dark mode](https://www.hteumeuleu.com/2021/emails-react-outlook-com-dark-mode/).

```html
<!-- Color -->
<div class="ogsc:text-slate-200">...</div>

<!-- Background color -->
<div class="ogsb:bg-slate-900">...</div>
```

Result:

```css
[data-ogsc] .ogsc\:text-slate-200 {
  color: #e2e8f0;
}

[data-ogsb] .ogsb\:bg-slate-900 {
  background-color: #0f172a;
}
```

### Open-Xchange

Use the `ox` variant to target webmail clients that are powered by [Open-Xchange](https://www.open-xchange.com/).

Some of these email clients include Comcast, Libero, 1&1 MailXchange, Network Solutions Secure Mail, Namecheap Email Hosting, Mailbox.org, 123-reg Email, Acens Correo Professional, Home.pl Cloud Email Xchange, Virgin Media Mail, and Ziggo Mail.

```html
<div class="ox:hidden">...</div>
```

Result:

```css
.ox\:hidden[class^="ox-"] {
  display: none;
}
```

[github-ci]: https://github.com/maizzle/tailwindcss-email-variants/actions
[github-ci-shield]: https://github.com/maizzle/tailwindcss-email-variants/actions/workflows/nodejs.yml/badge.svg
[license]: ./LICENSE
[license-shield]: https://img.shields.io/github/license/maizzle/tailwindcss-email-variants?color=0e9f6e
