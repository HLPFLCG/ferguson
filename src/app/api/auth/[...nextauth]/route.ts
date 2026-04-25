import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        if (credentials.email !== 'admin@manzanillo.lat') return null

        const passwordHash = process.env.ADMIN_PASSWORD_HASH || ''
        const valid = await bcrypt.compare(credentials.password, passwordHash)
        if (!valid) return null

        return { id: '1', email: credentials.email, name: 'Admin' }
      },
    }),
  ],
  pages: { signIn: '/admin' },
  session: { strategy: 'jwt' },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
