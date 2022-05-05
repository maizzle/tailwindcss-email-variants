# tailwindcss-email-variants

A plugin that provides variants for email client targeting hacks used in HTML emails.

## Installation

Install the plugin from npm:

```sh
npm install -D tailwindcss-email-variants
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-email-variants'),
    // ...
  ],
}
```

## Usage

Use the available variants to generate utilities that target specific email clients.

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

### Outlook (webmail)

Use the `outlook-web` variant to target iOS Mail 15 specifically:

```html
<div class="outlook-web:hidden">...</div>
```

Result:

```css
[class~="x_outlook-web\:hidden"] {
  display: none;
}
```

## Configuration

You can add your own variants by passing a configuration object to the plugin.

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwindcss-email-variants')({
      thunderbird: '.moz-text-html &', // & is the utility class
      example: ctx => `.example ${ctx.container.nodes[0].selector}` // using a function
    }),
    // ...
  ],
}
```

Use it:

```html
<div class="thunderbird:hidden example:flex">...</div>
```

Result:

```css
.moz-text-html .thunderbird\:hidden {
  display: none;
}

.example .flex {
  display: flex;
}
```
