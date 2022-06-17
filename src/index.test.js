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

it('`ogsc` variant', () => {
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

it('`ogsb` variant', () => {
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

it('`gmail` variant', () => {
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

it('`gmail-android` variant', () => {
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

it('`ios` variant', () => {
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

it('`ios-15` variant', () => {
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

it('`apple-mail` variant', () => {
  const config = {
    content: [{ raw: String.raw`<div class="apple-mail:hidden"></div>` }]
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .Singleton .apple-mail\:hidden {
        display: none;
      }
    `)
  })
})

it('`ox` variant', () => {
  const config = {
    content: [{ raw: String.raw`<div class="ox:hidden"></div>` }]
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .ox\:hidden[class^="ox-"] {
        display: none;
      }
    `)
  })
})
