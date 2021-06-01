import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA1r7xWkCrcZ2klgsTV65XdVMo0qP3c55k",
    authDomain: "clothing-store-5c089.firebaseapp.com",
    projectId: "clothing-store-5c089",
    storageBucket: "clothing-store-5c089.appspot.com",
    messagingSenderId: "244688725590",
    appId: "1:244688725590:web:8157f85b227c621655fdf7",
    measurementId: "G-FG0HVNR8ZR"
};

export const createUserProfileDocument = async (userAuth,additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log(error);
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey,objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });

    return await batch.commit();
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

/*********************************************
 *             DOCUMENTATION
 ********************************************/

// const provider = new firebase.auth.GoogleAuthProvider();
//
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
//
// provider.setCustomParameters({
//     'login_hint': 'user@example.com'
// });
//
// export const SignInWithGoogle = () =>{
//     firebase.auth()
//         .signInWithPopup(provider)
//         .then((result) => {
//             /** @type {firebase.auth.OAuthCredential} */
//             const credential = result.credential;
//
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const token = credential.accessToken;
//             // The signed-in user info.
//             const user = result.user;
//             // ...
//         }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         const credential = error.credential;
//         // ...
//     });
// }

// export default firebase;
