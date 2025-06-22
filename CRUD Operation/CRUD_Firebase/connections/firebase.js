import { initializeApp } from "firebase/app";
import {config} from "dotenv";
config();

const env = process.env;
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  messagingSenderId: env.FIREBASE_MESSAGE_SENDER_ID,
  appId: env.FIREBASE_APP_ID
};


export const firebaseApp =  initializeApp(firebaseConfig);