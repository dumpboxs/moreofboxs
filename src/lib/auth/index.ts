import { prismaAdapter } from 'better-auth/adapters/prisma'
import { betterAuth } from 'better-auth'
import {
  admin as adminPlugin,
  anonymous as anonymousPlugin,
  bearer as bearerPlugin,
  jwt as jwtPlugin,
  multiSession as multiSessionPlugin,
  openAPI as openAPIPlugin,
  username as usernamePlugin,
} from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { env } from '@/configs/env'
import { db } from '@/configs/db'
import { APP_CONSTANTS } from '@/constants'
import { UserRole } from '@/generated/prisma/enums'
import { ac, roles } from '@/lib/auth/permissions'

export const auth = betterAuth({
  appName: APP_CONSTANTS.name,
  advanced: {
    database: {
      generateId: false,
    },
  },
  baseURL: env.BETTER_AUTH_URL,
  database: prismaAdapter(db, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const adminEmails = env.ADMIN_EMAILS.includes(user.email)

          if (adminEmails) {
            return {
              data: {
                ...user,
                role: UserRole.admin,
              },
            }
          }

          return {
            data: {
              ...user,
              role: UserRole.user,
            },
          }
        },
      },
    },
  },
  plugins: [
    adminPlugin({
      adminRoles: [UserRole.admin],
      defaultRole: UserRole.user,
      ac,
      roles,
    }),
    anonymousPlugin(),
    bearerPlugin(),
    jwtPlugin(),
    multiSessionPlugin(),
    openAPIPlugin(),
    usernamePlugin(),
    tanstackStartCookies(),
  ],
  secret: env.BETTER_AUTH_SECRET,
  session: {
    expiresIn: 60 * 60 * 24 * 3,
  },
  trustedOrigins: [env.VITE_APP_URL],
})
