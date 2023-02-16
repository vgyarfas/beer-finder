import { setupWorker } from 'msw'

import { punkApiHandlers, yesNoApiHandlers } from './handlers'

export const worker = setupWorker(...punkApiHandlers, ...yesNoApiHandlers)