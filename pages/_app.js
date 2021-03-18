// import App from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import '../styles/global.scss';
import { useEffect } from 'react';

function CustomApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && pageProps && pageProps.autoCloseLoading) document.querySelector('body').classList.add('finish');
  }, []);

  return <Component {...pageProps} />
}

export default CustomApp;