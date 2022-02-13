import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  useFirebaseEmulator: window.location.hostname === "localhost",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const projectFunctions = firebase.app().functions();

//timestamp
const timestamp = firebase.firestore.Timestamp;

// functions側でfirebase emulator:startするなら意味がない？
const isEmulating = firebaseConfig.useFirebaseEmulator;
if (isEmulating) {
  firebase.functions().useEmulator("localhost", 5001);
}

export {
  firebase,
  projectFirestore,
  projectAuth,
  projectStorage,
  projectFunctions,
  timestamp,
  isEmulating,
};
