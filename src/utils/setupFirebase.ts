import { initializeApp } from "firebase/app";
import { browserLocalPersistence, initializeAuth } from "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

export default async function () {
  const firebaseApp = initializeApp(firebaseConfig);

  const auth = initializeAuth(firebaseApp, {
    persistence: browserLocalPersistence,
  });
}
