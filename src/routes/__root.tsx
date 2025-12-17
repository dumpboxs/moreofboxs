import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import type { QueryClient } from '@tanstack/react-query'

import type { orpc } from '@/orpc/client'
import { ThemeProvider } from '@/components/providers/theme-provider'
import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'
import appCss from '@/styles/app.css?url'
import { APP_CONSTANTS } from '@/constants'
import { Toaster } from '@/components/ui/sonner'
import { getAuthSession } from '@/functions/get-auth-session'

interface MyRouterContext {
  orpc: typeof orpc
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: `${APP_CONSTANTS.name} - mrboxs`,
      },
      {
        name: 'description',
        content: APP_CONSTANTS.description,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        media: '(prefers-color-scheme: dark)',
        rel: 'icon',
        href: APP_CONSTANTS.favicons.dark,
        url: APP_CONSTANTS.favicons.dark,
      },
      {
        media: '(prefers-color-scheme: light)',
        rel: 'icon',
        href: APP_CONSTANTS.favicons.light,
        url: APP_CONSTANTS.favicons.light,
      },
    ],
  }),

  shellComponent: RootDocument,
  component: RootComponent,
  beforeLoad: async () => {
    const auth = await getAuthSession()
    return { auth }
  },
})

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
