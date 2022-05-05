const path = require('path')
const etvPlugin = require('.')
const get = require('lodash.get')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

function run(config, plugin = tailwindcss) {
  let { currentTestName } = expect.getState()
  config = {
    ...{
      plugins: [etvPlugin],
      corePlugins: {
        preflight: false,
        textOpacity: false,
        backgroundOpacity: false,
      }
    },
    ...config,
  }

  return postcss(plugin(config)).process('@tailwind utilities', {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  })
}

it('should add the `ogsc` variant', () => {
  const config = {
    content: [{ raw: String.raw`<div class="ogsc:text-slate-200"></div>` }]
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      [data-ogsc] .ogsc\:text-slate-200 {
        color: #e2e8f0;
      }
    `)
  })
})

it('should add the `ogsb` variant', () => {
  const config = {
    content: [{ raw: String.raw`<div class="ogsb:bg-slate-900"></div>` }]
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      [data-ogsb] .ogsb\:bg-slate-900 {
        background-color: #0f172a;
      }
    `)
  })
})

it('should add the `gmail` variant', () => {
  const config = {
    content: [{ raw: String.raw`<div class="gmail:hidden"></div>` }]
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      u + .body .gmail\:hidden {
        display: none;
      }
    `)
  })
})

it('should add the `gmail-android` variant', () => {
  const config = {
    content: [{ raw: String.raw`<div class="gmail-android:hidden"></div>` }]
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      div > u + .body .gmail-android\:hidden {
        display: none;
      }
    `)
  })
})

it('should add the `ios` variant', () => {
  const config = {
    content: [{ raw: String.raw`<div class="ios:hidden"></div>` }]
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      @supports (-webkit-overflow-scrolling:touch) and (color:#ffff) {
        .ios\:hidden {
          display: none;
        }
      }
    `)
  })
})

it('should add the `ios-15` variant', () => {
  const config = {
    content: [{ raw: String.raw`<div class="ios-15:hidden"></div>` }]
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      @supports (-webkit-overflow-scrolling:touch) and (aspect-ratio: 1 / 1) {
        .ios-15\:hidden {
          display: none;
        }
      }
    `)
  })
})

it('should add the `outlook-web` variant', () => {
  const config = {
    content: [{ raw: String.raw`<div class="outlook-web:hidden"></div>` }]
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      [class~="x_outlook-web\:hidden"] {
        display: none;
      }
    `)
  })
})

it('should generate user-defined variants', () => {
  const config = {
    content: [{ raw: String.raw`<div class="thunderbird:hidden example:hidden"></div>` }],
    plugins: [
      etvPlugin({
        thunderbird: '.moz-text-html &',
        example: ctx => `.example ${ctx.container.nodes[0].selector}`
      })
    ],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .moz-text-html .thunderbird\:hidden {
        display: none;
      }

      .example .hidden {
        display: none;
      }
    `)
  })
})
