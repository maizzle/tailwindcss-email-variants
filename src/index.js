const get = require('lodash.get')
const plugin = require('tailwindcss/plugin')

const emailClientVariants = plugin.withOptions(
  function (options) {
    const userVariants = options || {}

    return function ({ addVariant }) {
      // Outlook.com dark mode
      addVariant('ogsc', '[data-ogsc] &')
      addVariant('ogsb', '[data-ogsb] &')

      // Gmail (webmail)
      addVariant('gmail', 'u + .body &')

      // Gmail (Android)
      addVariant('gmail-android', 'div > u + .body &')

      // iOS Mail 10+
      addVariant('ios', '@supports (-webkit-overflow-scrolling:touch) and (color:#ffff)')

      // iOS Mail 15+
      addVariant('ios-15', '@supports (-webkit-overflow-scrolling:touch) and (aspect-ratio: 1 / 1)')

      // Outlook (webmail)
      addVariant('outlook-web', ctx => {
        const foo = get(ctx.container.nodes[0], 'raws.tailwind.classCandidate', '&')
        return `[class~="x_outlook-web\\:${foo}"]`
      })

      // User-defined variants
      Object.keys(userVariants).forEach(key => {
        addVariant(key, userVariants[key])
      })
    }
  }
)

module.exports = emailClientVariants
