import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import "server-only";
 
const decodeKey = Buffer.from(process.env.AUTH_FIREBASE_PRIVATE_KEY_BASE64!, "base64").toString("utf-8");

export const firebaseCert = cert({
  projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
  clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
  privateKey: decodeKey,
});

 
 if (!getApps().length) {
   initializeApp({
     credential: firebaseCert,
     // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
   });
 }
 
 export const db = getFirestore();
 // export const storage = getStorage().bucket();