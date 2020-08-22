import * as firebase from 'firebase/app';

export default function UserPage({ isValidUser, ...rest }) {
  if (!isValidUser) return <>404!</>

  const { username, email } = rest;

  return (
    <>
      <h2>Hi {username}</h2>
      <p>{email}</p>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  const { username } = context.params;
  const snap = await firebase.database().ref('users').orderByChild('username').equalTo(username).once('value');
  const res = snap.val();

  let key = null;
  let user = null;
  let email = null;

  if (res) {
    key = Object.keys(res)[0];
    user = res[key].username;
    email = res[key].email;
  }

  return {
    props: {
      isValidUser: !!key,
      username: user,
      email
    }
  }
}
