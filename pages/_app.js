import '../reset.css';
import { ProvideAuth } from '../utils/auth';

// This default export is required in a new `pages/_app.js` file.
export default ({ Component, pageProps }) => (
  <ProvideAuth>
    <Component {...pageProps} />
  </ProvideAuth>
);
