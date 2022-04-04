/* eslint-disable require-await */
/* eslint-disable no-empty-pattern */
import { NavbarProps } from './Navbar.types'
// import styles from './Section.module.scss'

export const Navbar = ({
  sitename,
  categoriesMenuText,
  categories,
}: NavbarProps) => {
  console.log(
    'cat',
    categories?.edges?.map((e) => e.node)
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {sitename}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {categoriesMenuText}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories?.edges
                  ?.map((e) => e.node)
                  ?.map((cat) => (
                    <li>
                      <a
                        className="dropdown-item"
                        href={`/category/${cat.slug}`}
                      >
                        {cat.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}
