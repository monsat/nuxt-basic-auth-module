import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addServerHandler } from '@nuxt/kit'

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    basicAuth: {
      productionDomains?: string[]
      pairs?: Record<string, string>
      realm?: string
    }
  }
}

export interface ModuleOptions {
  enabled?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'basic-auth',
    configKey: 'basicAuth',
  },
  defaults: {
    enabled: true,
  },
  setup (options, _nuxt) {
    if (!options.enabled) {
      return
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    addServerHandler({
      middleware: true,
      handler: resolve(runtimeDir, 'server/middleware/auth'),
    })
  },
})
