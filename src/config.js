import firebase from "firebase"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyClN0re7d_GXCyx92eIlI2Cr_kDJKP8BTA",
    authDomain: "cricscore-94475.firebaseapp.com",
    projectId: "cricscore-94475",
    storageBucket: "cricscore-94475.appspot.com",
    databaseURL: "https://cricscore-94475/firebaseio.com",
    messagingSenderId: "291164162772",
    appId: "1:291164162772:web:3264f10f58fbf5b4c64941",
    measurementId: "G-EY9XKE35CQ"
}

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export default firebase