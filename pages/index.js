import { useEffect, useState } from 'react';
import AOS from 'aos';
import Slider from "react-slick";
import { fetch } from '../utils/fetch';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true
};

const Home = ({ video }) => {
  const [sections, setSections] = useState([]);
  useEffect(async () => {
    await fetch('/posts?categories=4').then(setSections);
    AOS.init();
  }, []);

  return (
    <>
      <div id="fullpage">
        {Boolean(video[0]) && (
          <section className="above-the-fold">
            <video autoPlay loop muted playsInline poster={video[0].featured_image} className="video">
              <source src={video[0].source_url} type="video/mp4" />
            </video>
          </section>
        )}
    
        {
          sections.length !== 0 && sections.map((section, index) => (
            <section key={index} style={{ background: section.background }}>
              <div className="container">
                <div className={`row d-flex flex-row${(index + 1) % 2 === 0 ? '-reverse' : ''}`}>
                  <div className="col-lg-7 mb-sm-4 mb-md-0 pr-xl-5">
                    <img src={section.featured_image} alt="" className="img-fluid aos-init aos-animate" data-aos="fade-in" />
                  </div>
                  <div className="col-lg-5 d-flex">
                    <div className="box-control center d-flex">
                      <div className="box-content d-flex justify-content-between flex-column pl-xl-5">
                        <h3 className="heading mb68 aos-init aos-animate mx-0" data-aos="fade-left">{section.title?.rendered}</h3>
                        <p data-aos="fade-up" className="aos-init aos-animate" dangerouslySetInnerHTML={{ __html: section.content?.rendered }} />
                        <div className="btn-position aos-init" data-aos="fade-left">
                          <a href="https://www.thetamora.com/next-level-apartment/" className="btn btn-outline-secondary text-uppercase">discover</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        }
        {/* 
    
        <section style={{ background: '#A2B3BB' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 order-lg-2">
                <div className="image-control aos-init aos-animate" data-aos="fade-in">
                  <img src="https://www.thetamora.com/wp-content/uploads/2019/09/home-image-02.jpg" alt="" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-4 order-lg-1 d-flex">
                <div className="box-control d-flex">
                  <div className="box-content d-flex justify-content-between flex-column">
                    <h3 className="heading mb68 aos-init aos-animate mx-0" data-aos="fade-left">5 Star Facilities</h3>
                    <p data-aos="fade-up" className="aos-init aos-animate">THE<strong>TAMORA</strong> apartments also have numerous communal facilities such as common gardens and terraces that provide secluded hideaways and precious green vistas. Also with ample storage facilities, your surfboards, golf clubs, and other gear can be stowed away and ready for your next visit. On the rooftop sits a five star communal kitchen and dining area with breathtaking views of the Indian Ocean.</p>
                    <div className="btn-position aos-init aos-animate" data-aos="fade-left">
                      <a href="https://www.thetamora.com/common-area/" className="btn btn-outline-secondary text-uppercase">discover</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-7 mb-sm-4 mb-md-0 pr-xl-5">
                <img src="https://www.thetamora.com/wp-content/uploads/2019/09/home-image-03.jpg" alt="" className="img-fluid aos-init aos-animate" data-aos="fade-in" />
              </div>
              <div className="col-lg-5 d-flex">
                <div className="box-control center d-flex">
                  <div className="box-content d-flex justify-content-between flex-column pl-xl-5">
                    <h3 className="heading mb68 aos-init aos-animate mx-0" data-aos="fade-left">SHOP</h3>
                    <p data-aos="fade-up" className="aos-init aos-animate">
                    THETAMORA also offers 19 Freehold retail spaces on the ground floor. These shops shall connect with the Tamora Gallery to create Canggu’s premier lifestyle arcade featuring over 50 premium brands with a wide variety of product. From F&B, to Fashion, to Fitness, Co- Working, Night-life and so much more. This creates the perfect synergy as residents benefit the convenience of having everything they need just steps away and shop owners always have a captive market.
                    </p>
                    <div className="btn-position aos-init" data-aos="fade-left">
                      <a href="https://www.thetamora.com/next-level-apartment/" className="btn btn-outline-secondary text-uppercase">discover</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <div>
          <Slider {...settings}>
            <div>
              <div style={{ height: '400px' }}>
                <img className="img-fluid" src="https://www.thetamora.com/wp-content/uploads/2019/09/gallery-01.jpg" />
              </div>
            </div>
            <div>
              <div style={{ height: '400px' }}>
                <img className="img-fluid" src="https://www.thetamora.com/wp-content/uploads/2019/09/gallery-02.jpg" />
              </div>
            </div>
          </Slider>
        </div>
      </div>
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

export default Home;