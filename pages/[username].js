import { useState, useEffect } from 'react';
import Layout from '@components/Layout';
import LinkForm from '@components/LinkForm';
import { getUserData, listenToChanges } from '../utils/dbQueries';
import { useAuth } from '../utils/auth';

export default function UserPage({ isValidUser, ...rest }) {
  if (!isValidUser) return <>404!</>

  const [links, setLinks] = useState([]);

  const { username, uid } = rest;
  const { userId } = useAuth();
  const editMode = uid === userId;

  useEffect(() => {
    listenToChanges(uid, setLinks);
  }, [setLinks])

  return (
    <>
      <Layout pageTitle="test" description="test">
        <h2>Hi {username}!</h2>
        <p>{editMode ? 'Edit mode' : null}</p>
        {editMode ? <LinkForm uid={userId} /> : null}
        {links.map(({ label, link, key }) => <a key={key} href={link}>{label}</a>)}
      </Layout>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  const { isValidUser, username, uid } = await getUserData(context.params.username);

  return {
    props: {
      isValidUser,
      username,
      uid
    }
  }
}
