const plugin = require('tailwindcss/plugin')

const emailClientVariants = plugin(function({ addVariant }) {
    // Outlook.com dark mode
    addVariant('ogsc', '[data-ogsc] &')
    addVariant('ogsb', '[data-ogsb] &')

    // Gmail (webmail)
    addVariant('gmail', 'u + .body &')

    // Gmail (Android)
    addVariant('gmail-android', 'div > u + .body &')

    // Apple Mail
    addVariant('apple-mail', '.Singleton &')

    // iOS Mail 10+
    addVariant('ios', '@supports (-webkit-overflow-scrolling:touch) and (color:#ffff)')

    // iOS Mail 15+
    addVariant('ios-15', '@supports (-webkit-overflow-scrolling:touch) and (aspect-ratio: 1 / 1)')

    // Open-Xchange (multiple clients)
    addVariant('ox', '&[class^="ox-"]')
  }
)

module.exports = emailClientVariants
