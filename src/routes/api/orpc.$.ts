import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins'
import { onError } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4'
import { createFileRoute } from '@tanstack/react-router'
import { experimental_SmartCoercionPlugin as SmartCoercionPlugin } from '@orpc/json-schema'
import { orpcRouter } from '@/orpc/router'
import { createORPCContext } from '@/orpc'
import { APP_CONSTANTS } from '@/constants'

const rpcHandler = new RPCHandler(orpcRouter, {
  interceptors: [
    onError((error) => {
      console.error(error)
    }),
  ],
})

const apiHandler = new OpenAPIHandler(orpcRouter, {
  interceptors: [
    onError((error) => {
      console.error(error)
    }),
  ],

  plugins: [
    new SmartCoercionPlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),

    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        info: {
          title: `${APP_CONSTANTS.name} ORPC API Reference`,
          version: '1.0.0',
        },
        security: [{ bearerAuth: [] }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
            },
          },
        },
      },
      docsConfig: {
        authentication: {
          securitySchemes: {
            bearerAuth: {
              token: 'default-token',
            },
          },
        },
      },
    }),
  ],
})

async function handle({ request }: { request: Request }) {
  const rpcResult = await rpcHandler.handle(request, {
    prefix: '/api/orpc',
    context: await createORPCContext({ req: request }),
  })
  if (rpcResult.response) return rpcResult.response

  const apiResult = await apiHandler.handle(request, {
    prefix: '/api/orpc/api-reference',
    context: await createORPCContext({ req: request }),
  })
  if (apiResult.response) return apiResult.response

  return new Response('Not found', { status: 404 })
}

export const Route = createFileRoute('/api/orpc/$')({
  server: {
    handlers: {
      HEAD: handle,
      GET: handle,
      POST: handle,
      PUT: handle,
      PATCH: handle,
      DELETE: handle,
    },
  },
})
