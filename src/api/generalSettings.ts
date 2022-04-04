/* eslint-disable require-await */
import graphQL from './graphql'

export async function getGeneralSettings() {
  return graphQL(
    `query GeneralSettings {
        generalSettings {
          dateFormat
          description
          language
          startOfWeek
          timeFormat
          timezone
          title
          url
        }
    }`,
    {}
  )
}
