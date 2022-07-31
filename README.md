# Nuxt Basic Auth Module

Basic authentication to protect your development website.

This module works **Nuxt 3** only.

## Installation

```
npm install -D nuxt-basic-authentication-module
```

## Usage

```nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'
import BasicAuth from '' // @TODO

export default defineNuxtConfig({
  modules: [
    BasicAuth,
  ],
})
```

## Options

### Module Options

#### enabled: boolean

If set to `false`, skip registration authentication handler.

```nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'
import BasicAuth from 'nuxt-basic-authentication-module'

export default defineNuxtConfig({
  modules: [
    [BasicAuth, { enabled: process.env.IS_PROD !== '1' }], // works unless `IS_PROD=1`
  ],
})
```

### RuntimeConfig

```typescript
interface RuntimeConfig {
  basicAuth: {
    productionDomains?: string[]
    pairs?: Record<string, string>
    realm?: string
  }
}
```

#### productionDomains

Authentication is not required in these domains.

`['foo.example.com']` matches also `bar.foo.example.com`

#### pairs (username: password)

default pair is `{ admin: 'admin' }`

#### realm

set `realm` if needed.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
