import Title from '../components/title';
import Navbar from '../components/navbar';
import { useEffect } from 'react';
import Footbar from '../components/footbar';

const HomepageTemp = () => {
  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined') document.querySelector('body').classList.add('finish');
    }, 3000);
  }, []);

  return (
    <>
      <Title title="Home Sweet Home" />

      <style jsx>
        {`
          .above-the-fold {
            background: url('/images/bg-indonesia-dark.jpg');
            background-repeat: no-repeat;
            background-size: cover;

            h1 {
              line-height: 2.0;
              letter-spacing: 1.5px;

              @media (max-width: 1024px) {
                font-size: 16px;
                line-height: 1.5;
              }
            }
          }
        `}
      </style>

      <style jsx global>
        {`
          #footbar-wrapper {
            background: rgba(0, 0, 0, 0.5) !important;
            bottom: 0 !important;
          }
        `}
      </style>

      <Navbar />
      <section className="above-the-fold align-items-center justify-content-center">
        <h1 className="text-light text-center">World's First Blockchain Powered Hotel <br />Coming to You in 2023!</h1>
      </section>

      <Footbar />
    </>
  );
}

export default HomepageTemp;