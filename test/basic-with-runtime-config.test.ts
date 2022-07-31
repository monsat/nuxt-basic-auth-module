import { fileURLToPath } from 'url'
import { describe, test, expect } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils-edge'
import BasicAuth from '../src/module'

describe('RuntimeConfig test: pairs', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    browser: true,
    nuxtConfig: {
      modules: [
        [BasicAuth, { enabled: true }],
      ],
      runtimeConfig: {
        basicAuth: {
          pairs: {
            foo: 'bar',
            baz: 'baz',
          },
        },
      },
    },
  })

  test('allow with http credentials', async () => {
    const page = await createPage('/', {
      httpCredentials: {
        username: 'foo',
        password: 'bar',
      },
    })

    const selector = await page.locator('div', { hasText: 'Nuxt Basic Auth Module' })
    const count = await selector.count()
    expect(count).not.toBe(0)
  })

  test('allow with right pair', async () => {
    const page = await createPage('/', {
      httpCredentials: {
        username: 'baz',
        password: 'baz',
      },
    })

    const selector = await page.locator('div', { hasText: 'Nuxt Basic Auth Module' })
    const count = await selector.count()
    expect(count).not.toBe(0)
  })

  test('access denied with wrong pair', async () => {
    const page = await createPage('/', {
      httpCredentials: {
        username: 'wrong',
        password: 'pair',
      },
    })

    const selector = await page.locator('div', { hasText: 'Nuxt Basic Auth Module' })
    const count = await selector.count()
    expect(count).toBe(0)
  })
})
