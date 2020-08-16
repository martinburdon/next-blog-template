import Head from 'next/head';
import Header from './Header';

export default function Layout({ children, description, pageTitle, ...props }) {
  return (
    <>
      <Head>
        {/* Global site tag (gtag.js) - Google Analytics */}
        {/*<script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-68690637-8"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-68690637-8');
              `,
          }}
        />*/}
        {/* Hotjar Tracking Code for http://www.houseplanttracker.com */}
        {/*<script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:1415416,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
          }}
        />*/}
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111" />
        <link rel="manifest" href="/manifest.json" />
        <title>{pageTitle}</title>
        <meta name="google-site-verification" content="r4JBHdFzbg5PFndKCNmpsBP5sIpCgIkrw1JC_EBl2KM" />
        <meta name="description" content={description}></meta>
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
