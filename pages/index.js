import Layout from '@components/Layout';
import PostList from '@components/PostList';
import getPosts from '@utils/getPosts';

const Index = ({ posts, title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={title} description={description}>
        <h1 className="title">Welcome to my blog!</h1>
        <p className="description">This is my blog, yada, yada, yada...</p>
        <main>
          <PostList posts={posts} />
        </main>
      </Layout>
      <style jsx>
      </style>
    </>
  );
}

export default Index;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  const posts = ((context) => {
    return getPosts(context);
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description
    }
  };
}
