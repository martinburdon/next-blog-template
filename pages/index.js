import Layout from '@components/Layout';
import PostList from '@components/PostList';
import getPosts from '@utils/getPosts';

const Index = ({ posts, title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={title} description={description}>
        <main>
          Some info about the site
        </main>
      </Layout>
      <style jsx>{`

      `}</style>
    </>
  );
}

export default Index;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    }
  };
}
