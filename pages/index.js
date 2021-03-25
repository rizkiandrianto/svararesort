import { useEffect } from 'react';
import Title from '../components/title';
import Navbar from '../components/navbar';
import Footbar from '../components/footbar';
import Forms from '../components/forms';
import { fetch } from '../utils/fetch';

const HomepageTemp = ({ video }) => {
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
            background: black;
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

              img {
                filter: grayscale(1) contrast(100) invert(1);
                margin-bottom: 32px;
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
            z-index: 3;

            &.above-the-fold {
              video {
                opacity: 0.3;
              }
            }
          }
        `}
      </style>

      <Navbar />

      <section id="landing" className="above-the-fold align-items-center justify-content-center">
        {video[0] && (
          <video autoPlay loop muted playsInline poster={video[0].featured_image} className="video">
            <source src={video[0].source_url} type="video/mp4" />
          </video>
        )}
        <h1 className="text-light text-center d-flex flex-column justify-content-center align-items-center text-uppercase">
          <img src="/images/logo-square.png" height="70" width="70" />
          World's First Blockchain Smart Resort<br />Coming to You in 2023!
        </h1>
      </section>

      {
        process.env.NEXT_PUBLIC_CONTACTFORM_ID && (
          <section id="contact" className="container">
            <div className="row flex-grow-1">
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

export async function getServerSideProps() {
  const video = await fetch('/media?slug=home-video').catch(() => []);
  return {
    props: {
      video
    }
  };
}

export default HomepageTemp;