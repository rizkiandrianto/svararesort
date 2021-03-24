import Title from '../components/title';
import Navbar from '../components/navbar';
import { useEffect } from 'react';
import Footbar from '../components/footbar';
import Forms from '../components/forms';

const HomepageTemp = () => {
  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined') document.querySelector('body').classList.add('finish');
      document.body.style.overflow = 'hidden';
    }, 3000);

    return () => {
      document.body.style.overflow = 'auto';
    }
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
            background-attachment: fixed;

            h1 {
              line-height: 2.0;
              letter-spacing: 1.5px;
              position: fixed;
              top: 50vh;
              transform: translateY(-50%);
              z-index: 1;

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

          section {
            background: white;
            position: relative;
            z-index: 2;
          }
        `}
      </style>

      <Navbar />

      <section id="landing" className="above-the-fold align-items-center justify-content-center">
        <h1 className="text-light text-center">World's First Blockchain Powered Hotel <br />Coming to You in 2023!</h1>
      </section>

      {
        process.env.NEXT_PUBLIC_CONTACTFORM_ID && (
          <section id="contact" className="container">
            <div className="row w-100">
              <div className="col-12 col-md-4 offset-md-4">
                <Forms id={process.env.NEXT_PUBLIC_CONTACTFORM_ID} />
              </div>
              <div className="col-12 col-md-4 offset-md-4">
                <p className="text-center pt-4 mt-4">
                  <a href="#landing">
                    Back to Home
                  </a>
                </p>
              </div>
            </div>
          </section>
        )
      }
      <Footbar />
    </>
  );
}

export default HomepageTemp;