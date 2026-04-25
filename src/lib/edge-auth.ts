/**
 * Edge-compatible authentication utilities using HMAC-SHA256.
 *
 * Token format (base64-encoded): `email|exp|signature`
 *   - email:     the authenticated user's email address
 *   - exp:       Unix timestamp (seconds) when the token expires
 *   - signature: hex-encoded HMAC-SHA256 of `email|exp` using AUTH_SECRET
 *
 * Security notes:
 *   - Tokens are HttpOnly, Secure, SameSite=Lax cookies — not accessible to JS
 *   - Signature verification uses constant-time comparison to prevent timing attacks
 *   - Rotate AUTH_SECRET to invalidate all existing sessions
 */

const TOKEN_COOKIE = 'admin_token'
export const TOKEN_TTL_SECONDS = 86400 // 24 hours

async function hmacSign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function hmacVerify(data: string, sig: string, secret: string): Promise<boolean> {
  const expected = await hmacSign(data, secret)
  if (expected.length !== sig.length) return false
  // Constant-time comparison
  let diff = 0
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i)
  }
  return diff === 0
}

export async function createToken(email: string, secret: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS
  const payload = `${email}|${exp}`
  const sig = await hmacSign(payload, secret)
  return btoa(`${payload}|${sig}`)
}

export async function verifyToken(token: string, secret: string): Promise<string | null> {
  try {
    const decoded = atob(token)
    const lastPipe = decoded.lastIndexOf('|')
    if (lastPipe === -1) return null
    const sig = decoded.slice(lastPipe + 1)
    const payloadPart = decoded.slice(0, lastPipe)
    const secondLastPipe = payloadPart.lastIndexOf('|')
    if (secondLastPipe === -1) return null
    const exp = parseInt(payloadPart.slice(secondLastPipe + 1), 10)
    const email = payloadPart.slice(0, secondLastPipe)
    if (isNaN(exp) || Math.floor(Date.now() / 1000) > exp) return null
    const valid = await hmacVerify(payloadPart, sig, secret)
    if (!valid) return null
    return email
  } catch {
    return null
  }
}

export function getTokenCookieName(): string {
  return TOKEN_COOKIE
}

export function makeTokenCookie(token: string, maxAge: number): string {
  return `${TOKEN_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`
}

export function clearTokenCookie(): string {
  return `${TOKEN_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
}
