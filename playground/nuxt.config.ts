import { defineNuxtConfig } from 'nuxt'
import BasicAuth from '../src/module'

export default defineNuxtConfig({
  modules: [
    [BasicAuth, {
      enabled: true,
    }],
  ],
  runtimeConfig: {
    basicAuth: {
      productionDomains: [
        'localhost:4044',
        'localhost:5055',
      ],
      pairs: {
        admin: 'test',
        foo: 'bar',
      },
      realm: 'Auth',
    },
  },
})
