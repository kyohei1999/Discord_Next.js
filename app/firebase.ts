// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDWrBVmLv8nE7510ZM0dlOdPmwA2MohzT8',
  authDomain: 'discode-clone-ec939.firebaseapp.com',
  projectId: 'discode-clone-ec939',
  storageBucket: 'discode-clone-ec939.appspot.com',
  messagingSenderId: '1043682521826',
  appId: '1:1043682521826:web:c0db246bb951b2d499e4bb',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//google認証
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
