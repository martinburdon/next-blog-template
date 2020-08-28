import Link from 'next/link';
import { useAuth } from '../utils/auth';
import { useRouter } from 'next/router';

export default function Header() {
  const { isLoading, logout, userId } = useAuth();
  const router = useRouter();

  const unauthedNav = (
    <>
      <li>
        <Link href="/martin">
          <a>Martin</a>
        </Link>
      </li>
      <li>
        <Link href="/martin2">
          <a>Martin2</a>
        </Link>
      </li>
      <li>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a>Log in</a>
        </Link>
      </li>
    </>
  );

  const authedNav = (
    <>
      <li>
        <Link href="/martin">
          <a>Martin</a>
        </Link>
      </li>
      <li>
        <Link href="/martin2">
          <a>Martin2</a>
        </Link>
      </li>
      <li>
        <Link href="/account">
          <a>Account</a>
        </Link>
      </li>
      <li>
        <button onClick={() => {
          logout().then(() => router.push('/login'))
        }}>Log out</button>
      </li>
    </>
  );

  let nav = 'Loading';
  if (!isLoading) {
    if (userId) {
      nav = authedNav
    } else {
      nav = unauthedNav;
    }
  }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <ul>{nav}</ul>
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
