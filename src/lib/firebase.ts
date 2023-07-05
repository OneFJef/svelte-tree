import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyDUIh0-QDSkwxMa4c5ynr6IuFC8laaf3XA",
  authDomain: "svelte-tree-9c1c1.firebaseapp.com",
  projectId: "svelte-tree-9c1c1",
  storageBucket: "svelte-tree-9c1c1.appspot.com",
  messagingSenderId: "561528198537",
  appId: "1:561528198537:web:5e0935196184db11c4bd58",
  measurementId: "G-D0JR51F0CG",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn("Auth is not initialized or not in browser");
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();
