import { describe, expect, it } from 'vitest'
import { isDeferredRoute } from '../src/pages/runtime/utils.ts'

describe('isDeferredRoute', () => {
  it('does not defer a URL that differs from the prerendered path only by its hash', () => {
    expect(isDeferredRoute('/about#target', '/about')).toBe(false)
    expect(isDeferredRoute('/about/#target', '/about')).toBe(false)
    expect(isDeferredRoute('/about#target', '/about/')).toBe(false)
  })

  it('does not defer the prerendered path itself', () => {
    expect(isDeferredRoute('/about', '/about')).toBe(false)
    expect(isDeferredRoute('/about/', '/about')).toBe(false)
  })

  it('defers a URL with different query params', () => {
    expect(isDeferredRoute('/about?foo=bar', '/about')).toBe(true)
    expect(isDeferredRoute('/about?foo=bar#target', '/about')).toBe(true)
  })

  it('defers a different path', () => {
    expect(isDeferredRoute('/other', '/about')).toBe(true)
    expect(isDeferredRoute('/other#target', '/about')).toBe(true)
  })
})
