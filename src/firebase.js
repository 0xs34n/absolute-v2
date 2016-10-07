import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyDSoYt1Ir2pSs60q7W2hvQ3WGw6MjbDtok',
	authDomain: 'absolute-1b139.firebaseapp.com',
	databaseURL: 'https://absolute-1b139.firebaseio.com',
	storageBucket: 'absolute-1b139.appspot.com'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();