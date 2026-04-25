// Minimal KV namespace interface for Cloudflare edge runtime
interface KVNamespace {
  get(key: string): Promise<string | null>
  put(key: string, value: string): Promise<void>
  delete(key: string): Promise<void>
  list(options?: {
    prefix?: string
    limit?: number
    cursor?: string
  }): Promise<{
    keys: { name: string; expiration?: number }[]
    list_complete: boolean
    cursor?: string
  }>
}

interface CloudflareEnv {
  BOOKINGS_KV: KVNamespace
  AUTH_SECRET?: string
  NEXTAUTH_SECRET?: string
  ADMIN_PASSWORD_HASH: string
  ADMIN_EMAILS?: string
}
