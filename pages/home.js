import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import Slider from "react-slick";
import { fetch } from '../utils/fetch';
import Loading from '../components/loading';
import Title from '../components/title';
import Navbar from '../components/navbar';
import Footbar from '../components/footbar';
import Forms from '../components/forms';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  mobileFirst: true
};

const Home = ({ video }) => {
  const [sections, setSections] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(async () => {
    await fetch(`/posts?categories=${process.env.NEXT_PUBLIC_HOMESECTION_ID}`).then((secs) => setSections(secs.reverse())).catch(() => false);
    if (typeof window !== 'undefined') document.querySelector('body').classList.add('finish');
    await fetch(`/posts/${process.env.NEXT_PUBLIC_HOMESLIDER_ID}`).then((post) => setGallery((post.gallery[0] || []).reverse())).catch(() => false);
    await fetch(`/posts?categories=${process.env.NEXT_PUBLIC_HOMENEWS_ID}`).then((posts) => setNews(posts.reverse())).catch(() => false);

    setLoading(false);
    AOS.init();
  }, []);

  const renderSlider = (index) => {
    if (process.env.NEXT_PUBLIC_INSERT_HOMEPAGE_SLIDER_AT > 0 &&
      process.env.NEXT_PUBLIC_INSERT_HOMEPAGE_SLIDER_AT <= sections.length &&
      (index + 1 == process.env.NEXT_PUBLIC_INSERT_HOMEPAGE_SLIDER_AT)) {
      return (
        <div>
          <Slider {...settings}>
            {gallery.map((image, index) => (
              <div key={index}>
                <div style={{ height: '400px' }}>
                  <img alt={`Slider Image ${index + 1}`} style={{ height: '100%', objectFit: 'cover', width: '100%' }} className="img-fluid" src={`${process.env.NEXT_PUBLIC_IMAGE_CDN}${image}`} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      );
    }

    return null;
  }

  return (
    <>
      <Title title="Home Sweet Home" />
      <Navbar />
      <div id="fullpage">
        {Boolean(video[0]) && (
          <section className="above-the-fold">
            <video autoPlay loop muted playsInline poster={video[0].featured_image} className="video">
              <source src={video[0].source_url} type="video/mp4" />
            </video>

            <style jsx>
              {`
                .above-the-fold {
                  position: relative;
                }

                .loading-wrapper {
                  position: absolute;
                  bottom: 20px;
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  opacity: 0.5;
                }
              `}
            </style>
            {loading && (
              <div className="loading-wrapper">
                <Loading />
              </div>
            )}
          </section>
        )}

        {
          sections.length !== 0 && sections.map((section, index) => (
            <React.Fragment key={index}>
              <section className="py-5 py-sm-0" style={{ background: section.background }}>
                <div className="container">
                  <div className={`row d-flex flex-row${(index + 1) % 2 === 0 ? '-reverse' : ''}`}>
                    <div className="col-lg-7 col-12 mb-4 mb-md-0 pr-xl-5">
                      <img alt={"Section Image " + section.title?.rendered} src={`${process.env.NEXT_PUBLIC_IMAGE_CDN}${section.featured_image}?optipress=2`} alt="" className="img-fluid aos-init aos-animate" data-aos="fade-in" />
                    </div>
                    <div className="col-lg-5 col-12 d-flex">
                      <div className="box-control center d-flex overflow-hidden">
                        <div className="box-content d-flex justify-content-between flex-column pl-xl-5">
                          <h3 className="heading mb68 aos-init aos-animate mx-0 mb-4 mb-sm-0" data-aos="fade-left">{section.title?.rendered}</h3>
                          <p data-aos="fade-up" className="aos-init aos-animate" dangerouslySetInnerHTML={{ __html: section.content?.rendered }} />
                          {section.button_link && (
                            <div>
                              <a data-aos="fade-left" href={section.button_link} className="btn btn-outline-secondary text-uppercase aos-init">discover</a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              { renderSlider(index)}
            </React.Fragment>
          ))
        }

        <section>
          <Slider {...settings}>
            {news.map((post, index) => (
              <div>
                <div className="card mb-3" style={{ width: '540px', height: '300px' }} key={index}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={post.featured_image.toString()} alt="..." />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{post.title.rendered}</h5>
                        <div className="card-text" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <section>
          <div id="invest" className="container">
            <div className="row">
              <div className="col-12 col-sm-6 offset-sm-6">
                <Forms id={process.env.NEXT_PUBLIC_CONTACTFORM_ID} />
              </div>
            </div>
          </div>
        </section>
      </div>
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

export default Home;