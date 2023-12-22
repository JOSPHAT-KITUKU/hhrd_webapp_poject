import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDYPc-Fg_DPeT3GLWQUZcaQUTVWMefd-pw",
  authDomain: "hhrdcakes.firebaseapp.com",
  databaseURL: "https://hhrdcakes-default-rtdb.firebaseio.com",
  projectId: "hhrdcakes",
  storageBucket: "hhrdcakes.appspot.com",
  messagingSenderId: "407320321768",
  appId: "1:407320321768:web:2d08326b17ed72ca5e335d",
  measurementId: "G-TRRN7Q9Z9G"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
