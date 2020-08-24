import React, { useState, useEffect, useContext, createContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { createUser, propertyExists } from '../utils/dbQueries';

// import prod from '../.firebase.prod.json';

const firebaseConfig = {
  apiKey: "AIzaSyBSl2RHPW4r5CVbfq7XbbQ4u-4GHCErAco",
  authDomain: "my-links-94d18.firebaseapp.com",
  databaseURL: "https://my-links-94d18.firebaseio.com",
  projectId: "my-links-94d18",
  storageBucket: "my-links-94d18.appspot.com",
  messagingSenderId: "835482208841",
  appId: "1:835482208841:web:9e0d28c79cfd56c0144d98"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const login = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        return user;
      });
  }

  const register = async (email, password, username) => {
    try {
      const usernameExists = await propertyExists('username', username);
      if (usernameExists) throw Error('username_exists');

      const emailExists = await propertyExists('email', email);
      if (emailExists) throw Error('email_exists');

      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Create user in Realtime DB after created in Firebase internal auth DB
      await createUser(response.user.uid, email, username);

      setUser(response.user);

      return {
        username,
        message: 'reg_success'
      };
    } catch (e) {
      // Firebase returns a `code`
      const msg = e.code || e.message;
      throw Error(msg);
    }
  }

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Query Realtime DB to get our custom user object
        firebase.database().ref(`users/${user.uid}`).once('value', (snap) => {
          // Combine our custom user data with `uid` from the auth DB
          const userData = {
            ...snap.val(),
            uid: user.uid
          };

          setUser(user);
        });
      } else {
        setUser(false);
      };

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    userId: user && user.uid,
    isLoading,
    login,
    register,
    logout
  };
}
