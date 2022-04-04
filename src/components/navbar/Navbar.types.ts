import { Term } from 'api/posts.types'

export type NavbarProps = {
  sitename?: string
  siteDescription?: string

  categoriesMenuText?: string
  categories?: { edges?: { node: Term }[] }
}
