import { createContext } from 'react';
import {initializeApp, FirebaseApp} from 'firebase/app';
import { getFirestore, Firestore } from "firebase/firestore"
import { getAuth, Auth } from "firebase/auth"
import { getAnalytics, Analytics } from 'firebase/analytics'

const firebase = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID
    });

const auth = getAuth(firebase)
const firestore = getFirestore(firebase)
const analytics = getAnalytics(firebase)

export const FirebaseContext = createContext<{
  firebase?: FirebaseApp
  firestore?: Firestore
  auth?: Auth
  analytics?: Analytics
}>({});

export const FirebaseProvider: React.FC = ({ children }) => {
    return (
        <FirebaseContext.Provider value={{ firebase, firestore, auth, analytics}}>
            {children}
        </FirebaseContext.Provider>
    );
}
