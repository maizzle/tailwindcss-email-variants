import path from 'path'
import etvPlugin from '.'
import postcss from 'postcss'
import { expect, test } from 'vitest'
import tailwindcss from 'tailwindcss'

// Custom CSS matcher
expect.extend({
  // Compare two CSS strings with all whitespace removed
  // This is probably naive but it's fast and works well enough.
  toMatchCss(received, argument) {
    function stripped(string_) {
      return string_.replaceAll(/\s/g, '').replaceAll(';', '')
    }

    const pass = stripped(received) === stripped(argument)

    return {
      pass,
      actual: received,
      expected: argument,
      message: () => pass ? 'All good!' : 'CSS does not match',
    }
  }
})

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

test('`ogsc` variant', () => {
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

test('`ogsb` variant', () => {
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

test('`gmail` variant', () => {
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

test('`gmail-android` variant', () => {
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

test('`ios` variant', () => {
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

test('`ios-15` variant', () => {
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

test('`apple-mail` variant', () => {
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

test('`ox` variant', () => {
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
