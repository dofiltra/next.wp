import Link from 'next/link'

import { CategoryProps } from './Category.types'
import styles from './Category.module.scss'

export const Category = ({ name, slug }: CategoryProps) => (
  <Link href={`/category/${slug}/`}>
    <a className={styles.category}>{name}</a>
  </Link>
)
