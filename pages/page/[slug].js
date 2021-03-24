import { fetch } from '../../utils/fetch';
import Error from 'next/error';
import Navbar from '../../components/navbar';
import Title from '../../components/title';
import Footbar from '../../components/footbar';

const Page = ({ statusCode, page }) => {
  if (statusCode > 300) {
    return (
      <Error statusCode={statusCode} />
    );
  }

  return (
    <>
      <Title title={page.title.rendered} />
      <style jsx>
        {`
          .above-the-fold {
            height: 50vh;
            width: 100%;
            background: url("${process.env.NEXT_PUBLIC_IMAGE_CDN + page.featured_image || `${NEXT_PUBLIC_IMAGE_CDN + process.env.NEXT_PUBLIC_API_HOST}/wp-content/uploads/2021/03/home-video-cover.jpg`}");
            background-repeat: no-repeat;
            background-size: cover;
            background-attachment: fixed;
          }
        `}
      </style>

      <Navbar />

      <div className="above-the-fold" />

      <section className="container flex-column py-4">
        <h1 className="mb-4 py-4">{page.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </section>

      <Footbar />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const pages = await fetch(`/pages?slug=${ctx.query.slug}`)
    .catch(() => []);
  const statusCode = pages == 0 ? 404 : 200;
  ctx.res.status = statusCode;

  return {
    props: {
      page: pages[0] || null,
      autoCloseLoading: true,
      statusCode
    }
  };
}

export default Page;