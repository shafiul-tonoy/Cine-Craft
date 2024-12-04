/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

import auth from "../firebase/firebase.config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [forgetPassword, setForgetPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // create User
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //log in with google

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //logout
  const logout = () => {
    setLoading(true);

    return signOut(auth);
  };

  //update user profile

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  //password reset

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // const handle forget password

  const handleForgetPassword = (email) => {
    setForgetPassword(email);
  };

  //use effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    createNewUser,
    logout,
    login,
    loading,
    updateUserProfile,
    user,
    setUser,
    signInWithGoogle,
    passwordReset,
    forgetPassword,
    handleForgetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
