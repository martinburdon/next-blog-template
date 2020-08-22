import { getUserData } from '../utils/dbQueries';

export default function UserPage({ isValidUser, ...rest }) {
  if (!isValidUser) return <>404!</>

  const { username, email } = rest;

  return (
    <>
      <h2>Hi {username}!</h2>
      <p>{email}</p>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  const { isValidUser, username } = await getUserData(context.params.username);

  return {
    props: {
      isValidUser,
      username
    }
  }
}
