import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <ul>
            <li>
              <Link href="/">
                <a>My Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          padding: 2rem;
        }

        ul {
          display: flex;
          list-style: none;
        }

        li {
          margin: 0 1rem;
        }
      `}</style>
    </>
  )
}
