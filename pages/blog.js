import Layout from '@components/Layout';
import getPosts from '@utils/getPosts';
import PostList from '@components/PostList';

const Blog = ({ title, description, posts, ...props }) => {
  return (
    <Layout pageTitle={`${title} | Blog`} description={description}>
      <h1 className="title">Blog</h1>
      <PostList posts={posts} />
    </Layout>
  )
}

export default Blog

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  const posts = ((context) => {
    return getPosts(context);
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
      posts
    }
  };
}
