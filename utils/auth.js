import React, { useState, useEffect, useContext, createContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

// import prod from '../.firebase.prod.json';

var firebaseConfig = {
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

  const login = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        return user;
      });
  }

  const register = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        return user;
      });
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
        setUser(user);
      } else {
        setUser(false);
      };
    });

    return () => unsubscribe();
  }, []);

  return {
    userId: user && user.uid,
    login,
    register,
    logout
  };
}
