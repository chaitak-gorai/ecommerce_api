import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Layout } from '../components/index';

import { StateContext } from '../context/StateContext';
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
