import { setupServer } from 'msw/node'

import { punkApiHandlers, yesNoApiHandlers } from './handlers'
// This configures a Service Worker with the given request handlers.
export const server = setupServer(...punkApiHandlers, ...yesNoApiHandlers)
