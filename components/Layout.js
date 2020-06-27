import Head from 'next/head';
import Header from './Header';

export default function Layout({ children, description, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description}></meta>
        <title>{pageTitle}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        html {
          font-size: 10px;
        }

        body {
          font-size: 1.6rem;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
            sans-serif;
          color: #445566;
        }

        a {
          color: #4caf50;
        }

        a:hover {
          color: #3a833c;
        }

        img {
          height: auto;
          max-width: 100%;
        }

        .site {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .layout,
        footer {
          padding: 2rem;
        }

        footer {
          background: #eee;
          display: flex;
          justify-content: center;
          margin-top: auto;
        }
      `}</style>
      <div className="site">
        <section className="layout">
          <Header />
          <div className="content">{children}</div>
        </section>
        <footer>Built by me!</footer>
      </div>
    </>
  )
}
