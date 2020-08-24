import Layout from '@components/Layout';
import { useForm } from 'react-hook-form';
import { useAuth } from '../utils/auth';
import { useRouter } from 'next/router';

const Login = ({ title, description, ...props }) => {
  const { register, handleSubmit, errors } = useForm();

  const auth = useAuth();
  const router = useRouter();

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await auth.login(email, password);
      router.push('/');
    } catch (e) {
      console.log(':: login error 2 ', e.message);
    }
  }

  return (
    <>
      <Layout pageTitle={`${title} | Log in`} description={description}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email</label>
            <input
              autoFocus
              name="email"
              ref={register({
                required: "Please enter your email"
              })}
              placeholder="name@site.com"
            >
            </input>
            <p>{errors.email && errors.email.message}</p>
          </div>

          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              ref={register({
                required: "Please enter a password"
              })}
              placeholder="*********"
            >
            </input>
            <p>{errors.password && errors.password.message}</p>
          </div>

          <button type="submit">
            Submit
          </button>
        </form>
      </Layout>
    </>
  )
}

export default Login;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
