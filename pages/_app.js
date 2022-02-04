import Layout from "../pages/components/layout/Layout";
import "../styles/globals.css";
import 'semantic-ui-css/semantic.min.css';

function MyApp({ Component, pageProps }) {
  return(<Layout>  <Component {...pageProps}></Component></Layout>)

}

export default MyApp;
