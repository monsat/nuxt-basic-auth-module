import { fileURLToPath } from 'url'
import { describe, test, expect } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils-edge'
import BasicAuth from '../src/module'

describe('Basic test: with module options', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    browser: true,
    nuxtConfig: {
      modules: [
        [BasicAuth, { enabled: true }],
      ],
    },
  })

  test('access denied without http credentials', async () => {
    const page = await createPage('/')

    const selector = await page.locator('div', { hasText: 'Nuxt Basic Auth Module' })
    const count = await selector.count()
    expect(count).toBe(0)
  })
  test('allow with http credentials', async () => {
    const page = await createPage('/', {
      httpCredentials: {
        username: 'admin',
        password: 'admin',
      },
    })

    const selector = await page.locator('div', { hasText: 'Nuxt Basic Auth Module' })
    const count = await selector.count()
    expect(count).not.toBe(0)
  })
})
