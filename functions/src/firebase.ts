import * as admin from "firebase-admin";

const firebaseApp = admin.initializeApp();
const firestore = firebaseApp.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

export { firebaseApp, firestore, timestamp };
