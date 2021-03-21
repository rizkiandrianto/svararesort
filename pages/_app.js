import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from "nprogress";
import Cookie from 'cookie-universal';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'nprogress/nprogress.css';

import '../styles/global.scss';
import { fetch } from '../utils/fetch';


function CustomApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && pageProps && pageProps.autoCloseLoading) document.querySelector('body').classList.add('finish');
    const NprogressStop = () => {
      NProgress.done();
    };

    Router.events.on("routeChangeStart", () => {
      NProgress.start()
    });
    Router.events.on("routeChangeComplete", NprogressStop);
    Router.events.on("routeChangeError", NprogressStop);
  }, []);

  return <Component {...pageProps} />
}

CustomApp.getInitialProps = async ({ ctx }) => {
  const cookie = Cookie(ctx.req, ctx.res);
  const token = cookie.get(process.env.NEXT_PUBLIC_INSTORE_TOKEN);

  const getToken = async () => await fetch('/wp-json/jwt-auth/v1/token', {
    baseUrl: process.env.NEXT_PUBLIC_API_HOST,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: process.env.PUBLIC_USERNAME,
      password: process.env.PUBLIC_PASSWORD
    })
  })
    .then((data) => {
      console.log(data);
      cookie.set(process.env.NEXT_PUBLIC_INSTORE_TOKEN, data.token);
    })
    .catch(async () => await getToken())

  if (token) {
    fetch('/wp-json/jwt-auth/v1/token/validate', {
      baseUrl: process.env.NEXT_PUBLIC_API_HOST,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .catch(async () => await getToken())
  } else {
    await getToken();
  }

  return {};
}

export default CustomApp;