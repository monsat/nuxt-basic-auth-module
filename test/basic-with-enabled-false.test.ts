import { fileURLToPath } from 'url'
import { describe, test, expect } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils-edge'
import BasicAuth from '../src/module'

describe('Basic test: with module options { enabled: false }', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    browser: true,
    nuxtConfig: {
      modules: [
        [BasicAuth, { enabled: false }],
      ],
    },
  })

  test('allow if enabled option is false', async () => {
    const page = await createPage('/')

    const selector = await page.locator('div', { hasText: 'Nuxt Basic Auth Module' })
    const count = await selector.count()
    expect(count).not.toBe(0)
  })
})
