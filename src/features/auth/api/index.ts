import { YesNoApiAnswer } from '../types'

import { AUTH_API_ROOT_URL } from '@/config'
import { authApiClient } from '@/lib/axios'

export const authWithYesNoApi = (): Promise<YesNoApiAnswer> => {
  return authApiClient.get(AUTH_API_ROOT_URL).then((response) => response.data.answer)
}