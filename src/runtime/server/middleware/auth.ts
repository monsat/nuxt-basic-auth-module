import { defineEventHandler } from 'h3'
import auth from 'basic-auth'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler((event) => {
  const {
    productionDomains = [],
    pairs = { admin: 'admin' },
    realm = 'Authentication Required',
  } = useRuntimeConfig().basicAuth || {}
  const { host = '' } = event.req.headers

  if (productionDomains.some(domain => host.endsWith(domain))) {
    return
  }

  const { name, pass } = auth(event.req) ?? {}
  if (!name || !pass || !pairs[name] || pairs[name] !== pass) {
    event.res.statusCode = 401
    event.res.setHeader('WWW-Authenticate', `Basic realm="${realm}"`)
    event.res.end('Unauthorized')
  }
})
