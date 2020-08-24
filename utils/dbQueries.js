/**
 *  Custom queries for use with the Realtime Database
 */

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

  let key = null;
  let user = null;

  if (snap.exists()) {
    const res = snap.val();
    key = Object.keys(res)[0];
    user = res[key].username;
  }

  return {
    isValidUser: !!key,
    username: user
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
