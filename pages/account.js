import Layout from '@components/Layout';
import { withAuthentication } from '../utils/withAuthentication';

const Account = ({ title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | Account`} description={description}>
        <h1 className="title">Account</h1>
      </Layout>
    </>
  )
}

export default withAuthentication(Account)

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
