import { auth } from './firebase';

export const signup = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signin = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signout = () =>
  auth.signOut();

export const reset = (email) =>
  auth.sendPasswordResetEmail(email);

export const update = (password) =>
  auth.currentUser.updatePassword(password);
