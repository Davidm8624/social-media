import Layout from "../pages/components/layout/Layout";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { destroyCookie, parseCookies } from "nookies";
// import { redirect } from "next/dist/server/api-utils";
import { baseURL, redirectUser } from "./util/auth";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  // const { Component, pageProps} = AppContext    junkkkkk
  // // console.log(AppContext);
  return (
    <Layout user={pageProps.user}>
      <Component {...pageProps} />
    </Layout>
  );
}
  MyApp.getInitialProps = async ({ ctx, Component }) => {
    const { token } = parseCookies(ctx);
    let pageProps = {};

    const protectedRoutes = ["/",'/[username]']; //will be added to in the future

    const isProtectedRoute = protectedRoutes.includes(ctx.pathname);

    if (!token) {
      isProtectedRoute && redirectUser(ctx, "/login");
    } else {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
      // console.log(`${baseURL}/api/v1/auth`);
      try {
        const res = await axios.get(`${baseURL}/api/v1/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { user, followStats } = res.data;
        if (user) !isProtectedRoute && redirectUser(ctx, "/");
        pageProps.user = user;
        pageProps.followStats = followStats;
      } catch (error) {
        console.log(error);
        destroyCookie(ctx, 'token')
        redirectUser(ctx, '/login')
      }
    }
    return{pageProps}
  };


export default MyApp;
