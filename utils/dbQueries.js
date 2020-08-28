/**
 *  Custom queries for use with the Realtime Database
 */

import { useAuth } from '../utils/auth';
import * as firebase from 'firebase/app';

/**
 *  Get user data based on username
 */
export const getUserData = async (username) => {
  const snap = await firebase
    .database()
    .ref('users')
    .orderByChild('username')
    .equalTo(username)
    .once('value');

  let uid = null;
  let userData = {};

  if (snap.exists()) {
    const data = snap.val();
    uid = Object.keys(data)[0];
    userData = data[uid];
  }

  return {
    isValidUser: !!uid,
    uid,
    ...userData
  }
};

/**
 *  Create a new user using UID from auth DB
 */
export const createUser = async (uid, email, username) => {
  try {
    await firebase
      .database()
      .ref(`users/${uid}`)
      .set({ email, username });
  } catch ({ message = 'error/generic' }) {
    throw Error(message);
  }
};

export const addLink = async (uid, label, link) => {
  try {
    await firebase
      .database()
      .ref(`users/${uid}/links`)
      .push({
        label,
        link
      })
  } catch (e) {
    console.log(':: e ', e);
    throw Error('uh-oh!');
  }
}

export const listenToChanges = async (uid, setLinks) => {
  console.log(':: listening ', uid);

  firebase
    .database()
    .ref(`users/${uid}/links`)
    .on('value', (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map(key => ({
        key,
        ...data[key]
      }));
      console.log(':: list ', list);
      setLinks(list);
    });

  // firebase
  //   .database()
  //   .ref(`users/${uid}/links`)
  //   .on('child_added', (snapshot) => {
  //     console.log(':: updated ', snapshot.val());
  //   });
}

/**
 *  Check for a property existing somewhere in the DB
 *  Commonly used to check if a username or email is already taken before reg
 */
export const propertyExists = async (property, value) => {
  const snap = await firebase
    .database()
    .ref('users')
    .orderByChild(property)
    .equalTo(value)
    .once('value');

  return snap.exists();
}
